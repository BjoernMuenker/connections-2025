export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();
  
  if (!user.value && (to.path === '/app' || to.path.startsWith('/app/'))) {
    return navigateTo('/sign-in')
  }
})