import { puzzles } from '~/content/puzzles';
import type { Puzzle } from '~/types/Puzzle';
import type { PuzzleGroup } from '~/types/PuzzleGroup';
import type { PuzzleState } from '~/types/PuzzleState';

export const usePuzzle = () => {
  function getColorByGroupId(id: string) {
    const idToColor: { [key: string]: string } = {
      a: 'yellow',
      b: 'green',
      c: 'blue',
      d: 'violet',
    };

    return idToColor[id];
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

  return { getColorByGroupId, initPuzzleById };
};
