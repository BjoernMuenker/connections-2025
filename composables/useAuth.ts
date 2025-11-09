export function useAuth() {
  const client = useSupabaseClient();
  const route = useRoute();

  async function logInByCode() {
    const code = route.query?.code as string;

    // fullscreen loader here...
    const { data, error } = await client.auth.exchangeCodeForSession(code);

    if (error) {
      return error.message;
    }
  }

  return { logInByCode };
}
