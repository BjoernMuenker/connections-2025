import type { PuzzlePersistedState } from '~/types/PuzzlePersistedState';
import type { Savegame } from '~/types/Savegame';

export function useSavegames() {
  const client = useSupabaseClient();

  async function getSavegames(options: { userId?: string; puzzleId?: string }): Promise<Savegame[] | undefined> {
    let query = client.from('savegames').select('*');

    if (options.userId) {
      query = query.eq('user_id', options.userId);
    }

    if (options.puzzleId) {
      query = query.eq('puzzle_id', options.puzzleId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching savegame:', error);
      return;
    }

    return data.map((entry) => {
      return {
        createdAt: entry.created_at,
        updatedAt: entry.updated_at!, // TODO: This has to be populated at all times!
        puzzleId: entry.puzzle_id,
        userId: entry.user_id,
        data: entry.data as unknown as PuzzlePersistedState,
      };
    });
  }

  return { getSavegames };
}
