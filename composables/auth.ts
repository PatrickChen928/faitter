import { useUserStore } from '@/store/user'

export function authedUser() {
  const user = useSupabaseUser()
  const userStore = useUserStore()
  if (!user || !userStore.user)
    throw new Error('Unauthenticated')

  return userStore.user
}
