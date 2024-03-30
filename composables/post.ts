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
  let filePath = ''
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

    filePath = storage?.path || ''
    const res = supabase.storage.from(StorageBucket).getPublicUrl(filePath)

    fileUrl = res.data.publicUrl || ''
  }

  const { data, error } = await supabase.from(PostTableName).insert({
    imageUrl: fileUrl,
    caption: post.caption,
    creator: userStore.user.id,
    location: post.location,
    tags: post.tags?.split(','),
    imageId: filePath,
  })

  if (error)
    throw error

  return data
}

export async function useGetPosts() {
  const supabase = useSupabaseClient<Database>()
  const { data, error } = await supabase.from(PostTableName).select(`
    id, 
    caption,
    imageUrl,
    location,
    tags,
    creator,
    createdAt,
    user: creator ( id, username, imageUrl )
  `).order('createdAt', { ascending: false }).limit(20)

  if (error)
    throw error

  return data as any as Post[]
}
