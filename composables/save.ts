import { PostTableName, SaveTableName } from '@/constants/table'
import type { Database, Post, Save } from '@/types/database.types'

export async function useSavePost(postId: string) {
  const user = authedUser()

  const supabase = useSupabaseClient<Database>()

  const saveData = await supabase.from(SaveTableName).select('*').eq('post', postId).eq('user', user.id)

  if (saveData.error)
    throw saveData.error

  const saved = !!saveData.data.length

  if (saved) {
    await supabase.from(SaveTableName).delete().eq('post', postId).eq('user', user.id)
  }
  else {
    await supabase.from(SaveTableName).insert({
      post: postId,
      user: user.id,
    })
  }

  return { saved: !saved }
}

export async function useGetSavedPosts() {
  const user = authedUser()

  const supabase = useSupabaseClient<Database>()

  const { data, error } = await supabase.from(SaveTableName).select('*').eq('user', user.id)

  if (error)
    throw error

  return data as any as Save[]
}

export async function useGetSavedPostsAll() {
  const user = authedUser()

  const supabase = useSupabaseClient<Database>()

  const { data, error } = await supabase.from(SaveTableName).select('*').eq('user', user.id)

  if (error)
    throw error

  if (!data.length)
    return []

  const postIds = data.map((save: Save) => save.post)

  const posts = await supabase.from(PostTableName).select(`
  id, 
  caption,
  imageUrl,
  location,
  tags,
  creator,
  createdAt,
  likes,
  user: creator ( id, username, imageUrl )
`).in('id', postIds)

  if (posts.error)
    throw posts.error

  return posts.data as any as Post[]
}
