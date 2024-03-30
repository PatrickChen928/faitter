const filterRoutes = [
  '/login',
  '/signup',
]

export default defineNuxtRouteMiddleware((to) => {
  const nuxtApp = useNuxtApp()

  const user = useSupabaseUser()
  if (!user.value && !filterRoutes.includes(to.path))
    return nuxtApp.runWithContext(() => navigateTo('/login'))
})
