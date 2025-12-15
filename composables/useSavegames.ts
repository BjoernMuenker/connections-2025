import type { PuzzlePersistedState } from '~/types/PuzzlePersistedState';
import type { Savegame } from '~/types/Savegame';

const chunkSize = 1000;

export function useSavegames() {
  const client = useSupabaseClient();

  async function getSavegames(options: { userId?: string; puzzleId?: string; sortBy?: 'updated_at' }): Promise<Savegame[]> {
    const results: Savegame[] = [];
    let from = 0;
    let to = chunkSize - 1;

    while (true) {
      let query = client.from('savegames').select('created_at, updated_at, puzzle_id, data, id');

      if (options.userId) {
        query = query.eq('user_id', options.userId);
      }

      if (options.puzzleId) {
        query = query.eq('puzzle_id', options.puzzleId);
      }

      if (options.sortBy) {
        query = query.order('updated_at', { ascending: false }).order('id', { ascending: false });
      }

      query = query.range(from, to);

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching savegames:', error);
        break;
      }

      if (!data || data.length === 0) {
        break;
      }

      results.push(
        ...data.map((entry) => ({
          createdAt: entry.created_at,
          updatedAt: entry.updated_at,
          puzzleId: entry.puzzle_id,
          data: entry.data as unknown as PuzzlePersistedState,
        }))
      );

      if (data.length < chunkSize) {
        break;
      }

      from += chunkSize;
      to += chunkSize;
    }

    return results;
  }

  return { getSavegames };
}
