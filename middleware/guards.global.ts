import { puzzles } from '~/content/puzzles';

export default defineNuxtRouteMiddleware(async (to) => {
  const { routes, isAppRoute } = useRoutes();

  if (!isAppRoute(to.path)) {
    return;
  }

  const { getServerTime } = useServerTime();

  if (import.meta.server) {
    const { data } = await useFetch<boolean>('/api/check-auth');

    if (!data.value) {
      return navigateTo(routes.signIn);
    }
  }

  if (import.meta.client) {
    const user = useSupabaseUser();

    if (!user.value) {
      return navigateTo(routes.signIn);
    }
  }

  const day = to.params.day as string | undefined;

  if (!day) return;

  const puzzle = puzzles[day];

  if (!puzzle) {
    return navigateTo(routes.app);
  }

  const serverTime = await getServerTime();

  if (!serverTime || serverTime < puzzle.unlocksAt) {
    return navigateTo(routes.app);
  }
});
