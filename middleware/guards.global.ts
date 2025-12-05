import { puzzles } from '~/content/puzzles';

export default defineNuxtRouteMiddleware(async (to) => {
  const { routes, isAppRoute } = useRoutes();
  const { getServerTime } = useServerTime();
  const { getSavegames } = useSavegames();
  const isDev = process.env.NODE_ENV === 'development';

  // skip for now
  // if (to.path === routes.signIn && user.value) {
  //   return navigateTo(routes.app);
  // }

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
      if (!(await useSupabaseClient().auth.getUser())) {
        return navigateTo(routes.signIn);
      }
    }
  }

  const day = to.params.day as string | undefined;

  if (!day) return;

  const puzzle = puzzles[day];

  if (!puzzle) {
    return navigateTo(routes.app);
  }

  if (import.meta.server) {
    const serverTime = await getServerTime();

    if (!serverTime || serverTime < puzzle.unlocksAt) {
      return navigateTo(routes.app);
    }

    if (to.name === 'app-day-statistik' && !isDev) {
      const savegame = await getSavegames({ userId: useSupabaseUser().value?.sub, puzzleId: puzzle.id });
      if (!savegame || savegame.length === 0 || savegame[0].data.solved.length !== 4) {
        return navigateTo(routes.app);
      }
    }
  }
});
