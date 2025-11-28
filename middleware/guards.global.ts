import { puzzles } from '~/content/puzzles';

export default defineNuxtRouteMiddleware(async (to) => {
  const { routes, isAppRoute } = useRoutes();
  const { getServerTime } = useServerTime();
  const user = useSupabaseUser();

  if (to.path === routes.signUp) {
    const serverTime = await getServerTime();
    if (!serverTime || serverTime < new Date('2025-12-01T00:00:00').getTime()) {
      return navigateTo(routes.signUpGuard);
    }
  }

  if (to.path === routes.signIn && user.value) {
    return navigateTo(routes.app);
  }

  if (!isAppRoute(to.path)) {
    return;
  }

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
