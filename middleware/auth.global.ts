export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/app')) {
    return
  }

  const client = useSupabaseClient()
  const { data: { user } } = await client.auth.getUser()

  if (!user) {
    return navigateTo('/sign-in')
  }
})