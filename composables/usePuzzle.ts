import { puzzles } from '~/content/puzzles';
import type { Json } from '~/types/database.types';
import type { Puzzle } from '~/types/Puzzle';
import type { PuzzleGroup } from '~/types/PuzzleGroup';
import type { PuzzlePersistedState } from '~/types/PuzzlePersistedState';
import type { PuzzleState } from '~/types/PuzzleState';
import type { ScoreAction } from '~/types/ScoreAction';

export const usePuzzle = (puzzleId: string) => {
  const user = useSupabaseUser();
  const client = useSupabaseClient();

  const puzzle = ref<PuzzleState>();

  function getColorByGroupId(id: string) {
    const idToColor: { [key: string]: string } = {
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
    const _puzzle = initPuzzleById(puzzleId);

    if (!_puzzle) return;

    const { data, error } = await client
      .from('savegames')
      .select('*')
      .eq('user_id', user.value?.sub ?? '');

    if (error || !data || data.length === 0) {
      puzzle.value = _puzzle;
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
  }

  async function save() {
    console.log('trigger save');

    if (!user.value || !puzzle.value) return;

    const savegame = createSavegame();

    if (!savegame) return;

    const { data, error } = await client.from('savegames').upsert(
      {
        user_id: user.value.sub,
        puzzle_id: puzzle.value.id,
        data: savegame as unknown as Json,
      },
      {
        onConflict: 'puzzle_id,user_id',
      }
    );
  }

  function createSavegame(): PuzzlePersistedState | undefined {
    if (!puzzle.value) return;

    return {
      id: puzzle.value.id,
      solved: puzzle.value.solved,
      remainingMistakes: puzzle.value.remainingMistakes,
      guesses: puzzle.value.guesses,
      won: puzzle.value.won,
    };
  }

  function getScoreByAction(action: ScoreAction) {
    const actionToScore: { [key in ScoreAction]: number } = {
      blueFoundFirst: 50,
      groupFound: 100,
      remainingMistake: 100,
      violetFoundFirst: 100,
    };

    return actionToScore[action];
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
    getScoreByAction,
    initPuzzleById,
    load,
    maxItemsSelected,
    puzzle,
    reset,
    save,
    solvedGroups,
  };
};
