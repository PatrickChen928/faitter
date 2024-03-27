const filterRoutes = [
  '/login',
  '/signup',
]

export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()
  if (!user.value && !filterRoutes.includes(to.path))
    return navigateTo('/login')
})
