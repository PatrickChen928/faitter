import { UserTableName } from '@/constants/table'
import type { Database, User } from '@/types/database.types'

export async function logout() {
  const supabase = useSupabaseClient()
  const router = useRouter()
  await supabase.auth.signOut()
  router.push('/login')
}

export async function useGetUsers() {
  const user = authedUser()

  const supabase = useSupabaseClient<Database>()
  const { data, error } = await supabase.from(UserTableName).select(`
    id,
    username,
    imageUrl
  `).not('id', 'eq', user.id)

  if (error)
    throw error

  return data as any as User[]
}
