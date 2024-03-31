<script setup lang="ts">
import { useToast } from '@/components/ui/toast'
import { useUserStore } from '@/store/user'
import type { Post } from '@/types/database.types'

const props = defineProps<{
  post: Post
  userId?: string
  saved?: boolean
}>()

const userStore = useUserStore()
const { toast } = useToast()

const isLiked = ref(false)
const likesCount = ref(props.post.likes?.length || 0)

const isSaved = ref(props.saved || false)

watch(() => props.saved, () => {
  isSaved.value = props.saved
})

watchEffect(() => {
  isLiked.value = !!(userStore.user && props.post.likes?.includes(userStore.user.id))
})

async function handleLikePost() {
  isLiked.value = !isLiked.value
  likesCount.value += isLiked.value ? 1 : -1
  try {
    await useLikePost(props.post.id)
  }
  catch (e: any) {
    toast({
      title: e.message,
      variant: 'destructive',
    })
    isLiked.value = !isLiked.value
    likesCount.value += isLiked.value ? 1 : -1
  }
}

async function handleSavePost() {
  isSaved.value = !isSaved.value
  try {
    await useSavePost(props.post.id)
  }
  catch (e: any) {
    toast({
      title: e.message,
      variant: 'destructive',
    })
    isSaved.value = !isSaved.value
  }
}
</script>

<template>
  <div class="flex justify-between items-center z-20">
    <div class="flex gap-2 mr-5">
      <NuxtImg
        :src="isLiked ? '/icons/liked.svg' : '/icons/like.svg'"
        width="20"
        height="20"
        alt="like"
        class="cursor-pointer"
        @click="handleLikePost"
      />
      <p class="small-medium lg:base-medium">
        {{ likesCount }}
      </p>
    </div>
    <div class="flex gap-2">
      <NuxtImg
        :src="isSaved ? '/icons/saved.svg' : '/icons/save.svg'"
        width="20"
        height="20"
        alt="save"
        class="cursor-pointer"
        @click="handleSavePost"
      />
    </div>
  </div>
</template>
