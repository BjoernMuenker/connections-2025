import { puzzles } from '~/content/puzzles';

export default defineNuxtRouteMiddleware(async (to) => {
  const { routes, isAppRoute } = useRoutes();

  if (!isAppRoute(to.path)) {
    return;
  }

  const client = useSupabaseClient();

  const { getServerTime } = useServerTime();

  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    return navigateTo(routes.signIn);
  }

  const day = to.params.day as string | undefined;

  if (day) {
    const puzzle = puzzles[day];

    if (!puzzle) {
      return navigateTo(routes.app);
    }

    const serverTime = await getServerTime();

    if (!serverTime || serverTime < puzzle.unlocksAt) {
      return navigateTo(routes.app);
    }
  }
});
