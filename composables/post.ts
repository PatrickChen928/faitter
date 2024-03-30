import { PostTableName, StorageBucket } from '@/constants/table'
import type { Database, Post } from '@/types/database.types'
import { useUserStore } from '@/store/user'

export interface IPost {
  caption: string
  location: string
  file: File[]
  tags: string
}

export async function useCreatePost(post: IPost) {
  const user = useSupabaseUser()
  const userStore = useUserStore()
  if (!user || !userStore.user)
    throw new Error('Unauthenticated')

  const supabase = useSupabaseClient<Database>()
  let fileUrl = ''
  if (post.file && post.file.length) {
    const file = post.file[0]
    const { error, data: storage } = await supabase
      .storage
      .from(StorageBucket)
      .upload(`${userStore.user.id}/${file.name}`, file, {
        cacheControl: '3600',
        upsert: true,
      })
    if (error)
      throw error

    fileUrl = storage?.path || ''
  }

  const { data, error } = await supabase.from(PostTableName).insert({
    imageUrl: fileUrl,
    caption: post.caption,
    creator: userStore.user.id,
    location: post.location,
    tags: post.tags?.split(','),
  })

  if (error)
    throw error

  return data
}
