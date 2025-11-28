export const useStats = () => {
  const user = useSupabaseUser();
  const client = useSupabaseClient();

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

  return { getScores, getScore, getGlobalScore };
};
