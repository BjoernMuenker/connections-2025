import { serverSupabaseServiceRole } from '#supabase/server';
import { readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const { userId, displayName } = await readBody(event);

  if (!userId || !displayName) {
    throw createError({ statusCode: 400, statusMessage: 'Missing data' });
  }

  const supabaseAdmin = await serverSupabaseServiceRole(event);

  const { data, error } = await supabaseAdmin.from('profiles').update({
    id: userId,
    username: displayName,
  });

  if (error) throw createError({ statusCode: 400, statusMessage: error.message });

  return true;
});
