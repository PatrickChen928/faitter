import { UserTableName } from '@/constants/table'
import type { Database, User } from '@/types/database.types'

export async function logout() {
  const supabase = useSupabaseClient()
  const router = useRouter()
  await supabase.auth.signOut()
  router.push('/login')
}

export async function useGetUsers(limit?: number) {
  const user = authedUser()

  const supabase = useSupabaseClient<Database>()
  const query = supabase.from(UserTableName).select(`
    id,
    username,
    imageUrl
  `).not('id', 'eq', user.id)

  if (limit)
    query.limit(limit)

  const { data, error } = await query

  if (error)
    throw error

  return data as any as User[]
}

export async function useGetUserById(id: string) {
  const supabase = useSupabaseClient<Database>()
  const { data, error } = await supabase.from(UserTableName).select(`
    id,
    username,
    imageUrl
  `).eq('id', id).single() as any

  const posts = await useGetPostsByUserId(id)

  if (error)
    throw error

  data.posts = posts

  return data as any as User
}
