import { puzzles } from '~/content/puzzles';
import { scoreActions } from '~/content/scoreActions';
import { useAppStore } from '~/store/appStore';
import type { Color } from '~/types/Color';
import type { Json } from '~/types/database.types';
import type { Puzzle } from '~/types/Puzzle';
import type { PuzzleGroup } from '~/types/PuzzleGroup';
import type { PuzzleGroupId } from '~/types/PuzzleGroupId';
import type { PuzzleGroupItemId } from '~/types/PuzzleGroupItemId';
import type { PuzzlePersistedState } from '~/types/PuzzlePersistedState';
import type { PuzzleScore } from '~/types/PuzzleScore';
import type { PuzzleState } from '~/types/PuzzleState';
import type { ScoreActionId } from '~/types/ScoreActionId';

export const usePuzzle = (puzzleId?: string) => {
  const user = useSupabaseUser();
  const client = useSupabaseClient();
  const store = useAppStore();
  const { $gsap } = useNuxtApp();

  const { getSavegames } = useSavegames();

  const loading = ref(false);
  const communityView = ref(false);
  const puzzle = ref<PuzzleState>();
  let lastPersistedState: PuzzlePersistedState | undefined;
  let scores: PuzzleScore | undefined;

  const guessIndex = computed(() => {
    if (!puzzle.value) return 0;
    return puzzle.value.guesses.length + solvedGroups.value.length;
  });

  function getColorByGroupId(id: PuzzleGroupId) {
    const idToColor: { [key in PuzzleGroupId]: Color } = {
      a: 'yellow',
      b: 'green',
      c: 'blue',
      d: 'violet',
    };

    return idToColor[id];
  }

  function getColorByGroupItemId(id: PuzzleGroupItemId) {
    return getColorByGroupId(id.slice(0, 1) as PuzzleGroupId);
  }

  function getNameByGroupId(id: PuzzleGroupId) {
    const idToName: { [key in PuzzleGroupId]: string } = {
      a: 'gelb',
      b: 'grün',
      c: 'blau',
      d: 'violett',
    };

    return idToName[id];
  }

  function getGroupsSolvedByUser(state: PuzzlePersistedState) {
    return state.solved.filter((groupId) => isGroupSolvedByUser(groupId, state));
  }

  function isGroupSolvedByUser(id: PuzzleGroupId, state: PuzzlePersistedState) {
    if (!state.solved.includes(id)) return false;
    return state.guesses.find((guess) => guess.every((itemId) => itemId.startsWith(id)));
  }

  const solvedGroups = ref<PuzzleGroup[]>([]);

  const maxItemsSelected = computed(() => {
    return puzzle.value?.selected.length === 4;
  });

  function getGroupById(id: string) {
    return puzzle.value?.groups.find((group) => group.id === id);
  }

  function getGroupByItemId(id: string) {
    return puzzle.value?.groups.find((group) => group.id.startsWith(id[0]));
  }

  function getItemIndexById(id: string) {
    return puzzle.value?.items.findIndex((item) => item.id === id);
  }

  function initPuzzleById(id: string): PuzzleState | undefined {
    const config = puzzles[id];

    if (!config) {
      return;
    }

    const puzzle: Puzzle = {
      id: config.id,
      font: config.font ?? 'Inter',
      groups: config.groups.map((group, groupIndex) => {
        return {
          ...group,
          id: getCharacterByAlphabeticalIndex(groupIndex),
          items: group.items.map((item, itemIndex) => {
            return { caption: item, id: getCharacterByAlphabeticalIndex(groupIndex) + (itemIndex + 1) };
          }),
        };
      }) as [PuzzleGroup, PuzzleGroup, PuzzleGroup, PuzzleGroup],
    };

    return {
      ...puzzle,
      selected: [],
      guesses: [],
      items: shuffleArray(puzzle.groups.map((group) => group.items).flat()),
      remainingMistakes: 4,
      solved: [],
      won: false,
    };
  }

  async function load(puzzleId: string) {
    const loadingStarted = Date.now();
    loading.value = true;
    const _puzzle = initPuzzleById(puzzleId);

    if (!_puzzle) {
      onLoadComplete(loadingStarted);
      return;
    }

    store.lastPlayedPuzzleId = _puzzle.id;

    const { data, error } = await client
      .from('savegames')
      .select('*')
      .eq('user_id', user.value?.sub ?? '')
      .eq('puzzle_id', puzzleId);

    if (error || !data || data.length === 0) {
      puzzle.value = _puzzle;
      onLoadComplete(loadingStarted);
      return;
    }

    const savegame = data[0].data as unknown as PuzzlePersistedState;

    puzzle.value = {
      ..._puzzle,
      ...savegame,
      items: shuffleArray(
        _puzzle.groups
          .filter((group) => !savegame.solved.includes(group.id))
          .map((group) => group.items)
          .flat()
      ),
    };

    solvedGroups.value = puzzle.value?.solved.map((id) => getGroupById(id)!);
    onLoadComplete(loadingStarted);
  }

  async function onLoadComplete(startedAt: number) {
    const savegame = createSavegame();

    if (savegame) {
      lastPersistedState = savegame;
    }

    const completedAt = Date.now();
    const loadingTimeMs = completedAt - startedAt;

    console.log('loaded for', loadingTimeMs, 'ms');

    if (loadingTimeMs < 1000) {
      await sleep(1000 - loadingTimeMs);
    }

    loading.value = false;
  }

  async function save() {
    if (!user.value || !puzzle.value) return;

    const savegame = createSavegame();

    if (!savegame) return;

    scores = getScoreDiff(lastPersistedState ?? savegame, savegame);
    lastPersistedState = savegame;

    const { data: dataA, error: errorA } = await client.from('savegames').upsert(
      {
        user_id: user.value.sub,
        puzzle_id: puzzle.value.id,
        data: savegame as unknown as Json,
      },
      {
        onConflict: 'puzzle_id,user_id',
      }
    );

    if (errorA) {
      console.error('unable to save game');
    }

    const scoreIncrement = sumArray(Object.values(scores).map((entry) => entry.total));

    if (scoreIncrement === 0) return;

    console.log('update score');

    const { data: dataB, error: errorB } = await client.rpc('increment_profile_score', {
      p_user_id: user.value.sub,
      p_increment: scoreIncrement,
    });

    if (errorB || dataB === null) {
      console.error('unable to update score');
    }
  }

  function pushScoreNotifications() {
    if (!scores) return;

    for (const [key, value] of Object.entries(scores)) {
      const { total: score, amount } = value;
      store.pushScoreNotification({ action: key as ScoreActionId, amount, score });
    }
  }

  function createSavegame(): PuzzlePersistedState | undefined {
    if (!puzzle.value) return;

    const nonReactivePuzzle = JSON.parse(JSON.stringify(puzzle.value));
    const { id, solved, remainingMistakes, guesses, won } = nonReactivePuzzle;

    return {
      id,
      solved,
      remainingMistakes,
      guesses,
      won,
    };
  }

  function getScoreFromSavegame(savegame: PuzzlePersistedState): PuzzleScore {
    const result: PuzzleScore = {};

    if (savegame.won) {
      const score = scoreActions['remainingMistake'].score;

      result.remainingMistake = {
        amount: savegame.remainingMistakes,
        single: score,
        total: score * savegame.remainingMistakes,
      };
    }

    const groupsSolvedByUser = savegame.solved.filter((groupId) =>
      savegame.guesses.find((guess) => guess.every((itemId) => itemId.startsWith(groupId)))
    );

    for (const groupId of groupsSolvedByUser) {
      const action = `${getColorByGroupId(groupId)}Solved` as ScoreActionId;
      const score = scoreActions[action].score;

      result[action] = {
        amount: 1,
        single: score,
        total: score,
      };
    }

    const firstSolvedGroupId = groupsSolvedByUser[0];

    if (['c', 'd'].includes(firstSolvedGroupId)) {
      const action = `${getColorByGroupId(firstSolvedGroupId)}SolvedFirst` as ScoreActionId;
      const score = scoreActions[action].score;

      result[action] = {
        amount: 1,
        single: score,
        total: score,
      };
    }

    return sortObjectByCustomOrder(result, [
      'yellowSolved',
      'greenSolved',
      'blueSolved',
      'blueSolvedFirst',
      'violetSolved',
      'violetSolvedFirst',
      'remainingMistake',
    ]);
  }

  function getScoreFromSavegames(savegames: PuzzlePersistedState[]) {
    const result: PuzzleScore = {};

    for (const savegame of savegames) {
      const partialResult = getScoreFromSavegame(savegame);

      Object.entries(partialResult).forEach(([scoreAction, value]) => {
        if (!result[scoreAction as ScoreActionId]) {
          result[scoreAction as ScoreActionId] = value;
        } else {
          result[scoreAction as ScoreActionId]!.amount += value.amount;
          result[scoreAction as ScoreActionId]!.single += value.single;
          result[scoreAction as ScoreActionId]!.total += value.total;
        }
      });
    }

    return sortObjectByCustomOrder(result, [
      'yellowSolved',
      'greenSolved',
      'blueSolved',
      'blueSolvedFirst',
      'violetSolved',
      'violetSolvedFirst',
      'remainingMistake',
    ]);
  }

  function getScoreDiff(from: PuzzlePersistedState, to: PuzzlePersistedState) {
    const fromScore = getScoreFromSavegame(from);
    const toScore = getScoreFromSavegame(to);

    return Object.fromEntries(Object.entries(toScore).filter(([key]) => !(key in fromScore))) as typeof toScore;
  }

  function deselectAllItems() {
    if (!puzzle.value) return;
    puzzle.value.selected = [];
  }

  async function reset() {
    if (!puzzle.value) return;

    const defaultPuzzle = initPuzzleById(puzzle.value.id);
    if (!defaultPuzzle) return;

    puzzle.value = defaultPuzzle;
    solvedGroups.value = [];
    await save();
  }

  async function createHeatmap() {
    if (!puzzle.value) return;
    deselectAllItems();

    // throw sth here
    const savegames = await getSavegames({ puzzleId: puzzle.value.id });
    if (!savegames) {
      //
      return;
    }

    if (savegames.length === 0) {
      store.pushToastNotification('Noch keine Daten anderer Spieler vorhanden');
    }

    resetHeatmap();

    console.log(guessIndex.value);

    // extract the guesses
    const guesses = savegames?.map((savegame) => savegame.data.guesses[guessIndex.value] ?? []).flat();

    console.log(guesses);

    console.warn(countOccurrences(guesses));

    const normalizeCounts = (counts: Record<string, number>): Record<string, number> => {
      const values = Object.values(counts);
      const min = Math.min(...values);
      const max = Math.max(...values);

      // Avoid division by zero if all tiles have the same count
      if (min === max) {
        return Object.fromEntries(
          Object.keys(counts).map((key) => [key, 0.5]) // all mid-intensity
        );
      }

      return Object.fromEntries(
        Object.entries(counts).map(([key, value]) => [
          key,
          roundToMaxFractions((value - min) / (max - min)), // → 0 to 1
        ])
      );
    };

    // const normalized = normalizeCounts(countOccurrences(guesses));
    const normalized = {
      a1: 0.3,
      b2: 1,
      d2: 0.5,
      d3: 0.4,
      d4: 0.5,
      b3: 0.1,
      c3: 0.2,
    };

    console.warn(normalized);

    const timeline = $gsap.timeline();

    for (const [tileId, percentage] of Object.entries(normalized)) {
      const scaled = clamp(0.15, 0.65, percentage);

      const max = 255;
      const red = 255;

      const greenBlue = Math.round(max * (1 - scaled)); // darker = more red

      timeline.to(`.puzzle-tile[data-id="${tileId}"] .inner`, { background: `rgb(${red}, ${greenBlue}, ${greenBlue})` }, '<+=0.05');
    }
  }

  function resetHeatmap() {
    $gsap.to(`.puzzle-tile .inner`, { background: `white` });
  }

  watch(
    () => guessIndex.value,
    () => {
      if (communityView.value) {
        createHeatmap();
      }
    }
  );

  watch(
    () => communityView.value,
    async (value: boolean) => {
      if (!value) {
        resetHeatmap();
        return;
      }

      createHeatmap();
    }
  );

  onBeforeMount(() => {
    if (!puzzleId) return;
    load(puzzleId);
  });

  return {
    communityView,
    deselectAllItems,
    getColorByGroupId,
    getColorByGroupItemId,
    getGroupById,
    getGroupByItemId,
    getGroupsSolvedByUser,
    getItemIndexById,
    getNameByGroupId,
    getScoreFromSavegame,
    getScoreFromSavegames,
    guessIndex,
    initPuzzleById,
    isGroupSolvedByUser,
    lastPersistedState,
    load,
    loading,
    maxItemsSelected,
    pushScoreNotifications,
    puzzle,
    reset,
    save,
    solvedGroups,
  };
};
