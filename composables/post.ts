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
    tags: post.tags?.replace(/ /g, '').split(','),
    imageId: filePath,
  })

  if (error)
    throw error

  return data
}

export async function useUpdatePost(id: string, post: IPost) {
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

  const updateData: any = {
    caption: post.caption,
    creator: user.id,
    location: post.location,
    tags: post.tags?.replace(/ /g, '').split(','),
  }

  if (fileUrl) {
    updateData.imageUrl = fileUrl
    updateData.imageId = filePath
  }

  const { data, error } = await supabase.from(PostTableName).update(updateData).eq('id', id)

  if (error)
    throw error

  return data
}

export async function useGetPostDetail(id: string) {
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
  `).eq('id', id).single()

  if (error)
    throw error

  return data as any as Post
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

export async function useDeletePost(id: string) {
  const user = authedUser()

  const supabase = useSupabaseClient<Database>()

  const post = await supabase.from(PostTableName).select('*').eq('id', id).eq('creator', user.id).single()

  if (post.error)
    throw post.error

  if (!post.data)
    throw new Error('Post not found')

  const res = await supabase.from(PostTableName).delete().eq('id', id)
  return res
}

export async function useGetInfinitePosts(page: number) {
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
  `).order('createdAt', { ascending: false }).range(page * 10, (page + 1) * 10)

  if (error)
    throw error

  return data as any as Post[]
}

export async function useSearchPosts(searchItem: string) {
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
  `).ilike('caption', `%${searchItem}%`)

  if (error)
    throw error

  return data as any as Post[]
}

export async function useGetPostsByUserId(userId: string) {
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
  `).eq('creator', userId)

  if (error)
    throw error

  return data as any as Post[]
}

export async function useGetSelfPosts() {
  const user = authedUser()

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
  `).eq('creator', user.id)

  if (error)
    throw error

  return data as any as Post[]
}

export async function useGetLikedPosts() {
  const user = authedUser()

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
`).contains('likes', [user.id])

  if (error)
    throw error

  return data as any as Post[]
}

export async function useGetPostsByIds(ids: string[]) {
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
`).in('id', ids)

  if (error)
    throw error

  return data as any as Post[]
}
