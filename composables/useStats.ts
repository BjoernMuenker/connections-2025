import { groupNames } from '~/content/groupNames';
import type { PuzzleGroupId } from '~/types/PuzzleGroupId';
import type { PuzzleGroupItemId } from '~/types/PuzzleGroupItemId';
import type { PuzzlePersistedState } from '~/types/PuzzlePersistedState';

export const useStats = () => {
  const user = useSupabaseUser();
  const client = useSupabaseClient();
  const { getColorByGroupId, getGroupsSolvedByUser } = usePuzzle();

  async function getScores(options?: { exclude: string[] }) {
    let query = client.from('profiles').select('username, score').order('score', { ascending: false });

    if (options?.exclude) {
      query.not('username', 'in', `(${options?.exclude.map((u) => `"${u}"`).join(',')})`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('fail');
      return;
    }

    return data.map((entry) => {
      return { ...entry, username: entry.username ?? 'n/a' };
    });
  }

  async function getScore(username: string) {
    const data = await getScores();

    if (!data) return;

    const playerIndex = data?.findIndex((entry) => entry.username === username);
    const rank = playerIndex + 1;
    const badge = getScoreBadge(rank, 50);

    return {
      score: data[playerIndex].score,
      rank,
      totalRanks: data.length,
      ...(badge && { badge }),
    };
  }

  async function getGlobalScore() {
    const data = await getScores();

    if (!data) return;

    return {
      score: sumArray(data.map((entry) => entry.score)),
      totalRanks: data.length,
    };
  }

  function getScoreBadge(rank: number, totalRanks: number) {
    const percentage = (rank / totalRanks) * 100;

    if (percentage > 20) {
      return undefined;
    }

    if (percentage <= 5) {
      return 'Top 5%';
    }

    if (percentage <= 10) {
      return 'Top 10%';
    }

    if (percentage <= 20) {
      return 'Top 20%';
    }
  }

  function getMistakesPerPuzzle(data: PuzzlePersistedState[]) {
    const aggregated = data.reduce<Record<string, number>>((acc, item) => {
      if (item.guesses.length === 0) return acc;
      acc[item.id] = (acc[item.id] ?? 0) + (4 - item.remainingMistakes);
      return acc;
    }, {});

    return aggregated;
  }

  function getSolveOrder(states: PuzzlePersistedState[], position: 'first' | 'last') {
    const counts: { [key in PuzzleGroupId]: number } = {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
    };

    for (const state of states) {
      const solvedGroups = getGroupsSolvedByUser(state);
      if (solvedGroups.length === 0 || (position === 'last' && state.solved.length !== 4)) continue;
      const index = position === 'first' ? 0 : solvedGroups.length - 1;
      counts[solvedGroups[index]]++;
    }

    return Object.entries(counts).map(([key, value]) => {
      return {
        id: key,
        caption: groupNames[key as PuzzleGroupId],
        color: getColorByGroupId(key as PuzzleGroupId),
        amount: value,
      };
    });
  }

  function getGuessesOccurrences(states: PuzzlePersistedState[]) {
    const guesses = states.map((state) => state.guesses.map((guess) => guess.join('-'))).flat();
    const occurenences = _countOccurrences(guesses);
    return occurenences.map((entry) => {
      return { ...entry, value: entry.value.split('-') };
    }) as { value: PuzzleGroupItemId[]; count: number }[];
  }

  return { getScores, getScore, getGlobalScore, getGuessesOccurrences, getMistakesPerPuzzle, getSolveOrder };
};
