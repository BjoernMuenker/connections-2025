import type { PuzzlePersistedState } from '~/types/PuzzlePersistedState';
import type { Savegame } from '~/types/Savegame';

export function useSavegames() {
  const client = useSupabaseClient();

  async function getSavegames(options: { userId?: string; puzzleId?: string; sortBy?: 'updated_at' }): Promise<Savegame[] | undefined> {
    let query = client.from('savegames').select('created_at, updated_at, puzzle_id, data, id');

    if (options.userId) {
      query = query.eq('user_id', options.userId);
    }

    if (options.puzzleId) {
      query = query.eq('puzzle_id', options.puzzleId);
    }

    if (options.sortBy) {
      query = query.order('updated_at', { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching savegame:', error);
      return;
    }

    return data.map((entry) => {
      return {
        createdAt: entry.created_at,
        updatedAt: entry.updated_at,
        puzzleId: entry.puzzle_id,
        data: entry.data as unknown as PuzzlePersistedState,
      };
    });
  }

  return { getSavegames };
}
