import { puzzles } from '~/content/puzzles';
import { scoreActions } from '~/content/scoreActions';
import { useAppStore } from '~/store/appStore';
import type { Json } from '~/types/database.types';
import type { Puzzle } from '~/types/Puzzle';
import type { PuzzleGroup } from '~/types/PuzzleGroup';
import type { PuzzleGroupId } from '~/types/PuzzleGroupId';
import type { PuzzlePersistedState } from '~/types/PuzzlePersistedState';
import type { PuzzleScore } from '~/types/PuzzleScore';
import type { PuzzleState } from '~/types/PuzzleState';
import type { ScoreActionId } from '~/types/ScoreActionId';

export const usePuzzle = (puzzleId?: string) => {
  const user = useSupabaseUser();
  const client = useSupabaseClient();
  const store = useAppStore();

  const loading = ref(false);
  const puzzle = ref<PuzzleState>();
  let lastPersistedState: PuzzlePersistedState | undefined;
  let scores: PuzzleScore | undefined;

  function getColorByGroupId(id: PuzzleGroupId) {
    const idToColor: { [key in PuzzleGroupId]: string } = {
      a: 'yellow',
      b: 'green',
      c: 'blue',
      d: 'violet',
    };

    return idToColor[id];
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

    const { data, error } = await client
      .from('savegames')
      .select('*')
      .eq('user_id', user.value?.sub ?? '');

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

    if (loadingTimeMs < 500) {
      await sleep(500 - loadingTimeMs);
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

    const scoreIncrement = sumArray(Object.values(scores).map((entry) => entry.total));

    // const { data: dataB, error: errorB } = await client
    //   .from('profiles')
    //   .update({
    //     score: scoreIncrement,
    //   })
    //   .eq('id', user.value.sub);

    const { data: dataB, error: errorB } = await client.rpc('increment_profile_score', {
      p_user_id: user.value.sub,
      p_increment: scoreIncrement,
    });

    if (errorA) {
      console.error('unable to save game');
    }

    if (errorB) {
      console.error('unable to update score');
    }

    console.log(dataB);
  }

  function pushScoreNotifications() {
    console.log('pushScoreNotifications', scores);
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

  function getScoreFromSavegame(savegame: PuzzlePersistedState) {
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

    return result;
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

  onBeforeMount(() => {
    if (!puzzleId) return;
    load(puzzleId);
  });

  return {
    deselectAllItems,
    getColorByGroupId,
    getGroupById,
    getGroupByItemId,
    getItemIndexById,
    initPuzzleById,
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
