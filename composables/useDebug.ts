import { puzzles } from '~/content/puzzles';

export function useDebug() {
  function getCompletedPuzzleCount() {
    return Object.values(puzzles).filter((puzzle) => puzzle.groups.every((group) => group.items.filter((item) => item).length === 4)).length;
  }

  function getMissingItemsCount() {
    return Object.values(puzzles)
      .map((puzzle) => puzzle.groups.map((group) => group.items.filter((item) => !item)).flat())
      .flat().length;
  }

  function getDuplicatedItemGroups() {
    const duplicates = [];

    const allItems = Object.values(puzzles)
      .map((puzzle) => puzzle.groups.map((group) => sortAlphabetically(group.items).flat().join('-')))
      .flat();

    const counts = new Map<string, number>();

    for (const v of allItems) {
      counts.set(v, (counts.get(v) ?? 0) + 1);
    }

    return [...counts].filter(([_, count]) => count > 1).map(([value]) => value);
  }

  return {
    getCompletedPuzzleCount,
    getMissingItemsCount,
    getDuplicatedItemGroups,
  };
}
