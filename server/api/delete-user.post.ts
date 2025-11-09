import { serverSupabaseClient, serverSupabaseServiceRole } from '#supabase/server';

export default eventHandler(async (event) => {
  console.log('delete-user');
  const serviceRoleClient = await serverSupabaseServiceRole(event);
  const client = await serverSupabaseClient(event);

  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    return false;
  }

  const { data, error } = await serviceRoleClient.auth.admin.deleteUser(user.id);

  if (error) {
    return false;
  }

  return true;
});
