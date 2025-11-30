import { errorMessages } from '~/content/errorMessages';
import { useAppStore } from '~/store/appStore';
import type { ErrorCode } from '~/types/ErrorCode';

export function useAuth() {
  const { routes } = useRoutes();
  const store = useAppStore();
  const supabase = useSupabaseClient();

  function getErrorMessage(code?: string) {
    if (!code || !errorMessages[code as ErrorCode]) return errorMessages.unknown;
    return errorMessages[code as ErrorCode];
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigateTo(routes.signIn);
    store.tutorials = undefined;
    store.offCanvas = undefined;
    store.offCanvasVisible = false;
  }

  return { getErrorMessage, signOut };
}
