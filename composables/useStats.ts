export const useStats = () => {
  const user = useSupabaseUser();
  const client = useSupabaseClient();

  async function getScores() {
    const { data, error } = await client.from('profiles').select('id, username, score').order('score', { ascending: false });
    if (error) {
      console.error('fail');
      return;
    }

    return data;

    // return await client
    //   .from('profiles')
    //   .select('score', { count: 'exact' }) // 'exact' gives total row count
    //   .eq('id', userId); // filter for specific user
  }

  async function getPlayerStats(id: string) {
    const data = await getScores();

    if (!data) return;

    const playerIndex = data?.findIndex((entry) => entry.id === id);
    const rank = playerIndex + 1;
    const badge = getScoreBadge(rank, 50);

    return {
      score: data[playerIndex].score,
      rank,
      totalRanks: data.length,
      ...(badge && { badge }),
    };
  }

  function getScoreBadge(rank: number, totalRanks: number) {
    const percentage = (rank / totalRanks) * 100;
    console.log(percentage);

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

  return { getScores, getPlayerStats };
};
