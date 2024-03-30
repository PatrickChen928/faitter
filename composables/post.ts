import { authedUser } from './auth'
import { PostTableName, StorageBucket } from '@/constants/table'
import type { Database, Post } from '@/types/database.types'

export interface IPost {
  caption: string
  location: string
  file: File[]
  tags: string
}

export async function useCreatePost(post: IPost) {
  const user = authedUser()

  const supabase = useSupabaseClient<Database>()

  let fileUrl = ''
  let filePath = ''
  if (post.file && post.file.length) {
    const file = post.file[0]
    const { error, data: storage } = await supabase
      .storage
      .from(StorageBucket)
      .upload(`${user.id}/${file.name}`, file, {
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
    creator: user.id,
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
    likes,
    user: creator ( id, username, imageUrl )
  `).order('createdAt', { ascending: false }).limit(20)

  if (error)
    throw error

  return data as any as Post[]
}

export async function useLikePost(postId: string) {
  const user = authedUser()

  const supabase = useSupabaseClient<Database>()

  const post = await supabase.from(PostTableName).select('*').eq('id', postId).single()

  if (post.error)
    throw post.error

  const likes = post.data?.likes || []

  const isLiked = likes.find((like: string) => like === user.id)

  if (isLiked) {
    await supabase.from(PostTableName).update({
      likes: likes.filter((like: string) => like !== user.id),
    }).eq('id', postId)
  }
  else {
    await supabase.from(PostTableName).update({
      likes: [...likes, user.id],
    }).eq('id', postId)
  }

  return { isLiked: !isLiked }
}
