import { StorageBucket, UserTableName } from '@/constants/table'
import type { Database, User } from '@/types/database.types'

export interface IUser {
  bio: string
  file: File[]
}

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
  `).eq('id', id) as any

  const posts = await useGetPostsByUserId(id)

  if (error)
    throw error

  const user = data[0] as User
  user.posts = posts

  return user as any as User
}

export async function useUpdateUser(user: IUser) {
  const self = authedUser()

  const supabase = useSupabaseClient<Database>()

  const params: Partial<User> = {
    bio: user.bio,
  }

  if (user.file && user.file.length) {
    const file = user.file[0]
    const { error, data: storage } = await supabase
      .storage
      .from(StorageBucket)
      .upload(`${self.id}/avatar/${file.name}`, file, {
        cacheControl: '3600',
        upsert: true,
      })
    if (error)
      throw error

    const filePath = storage?.path || ''
    const res = supabase.storage.from(StorageBucket).getPublicUrl(filePath)

    const fileUrl = res.data.publicUrl || ''
    params.imageUrl = fileUrl
    params.imageId = filePath
  }

  const { data, error } = await supabase.from(UserTableName).upsert(params).eq('id', self.id)

  if (error)
    throw error

  return data as any as User
}
