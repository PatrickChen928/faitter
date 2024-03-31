<script setup lang="ts">
import type { Post } from '@/types/database.types'
import { useUserStore } from '@/store/user'

defineProps({
  posts: {
    type: Array as () => Post[],
    required: true,
  },
  showUser: {
    type: Boolean,
    default: true,
  },
  showStats: {
    type: Boolean,
    default: true,
  },
})

const userStore = useUserStore()
</script>

<template>
  <ul class="grid-container">
    <li v-for="post in posts" :key="post.id" class="relative min-w-80 h-80">
      <NuxtLink :to="`/posts/${post.id}`" class="grid-post_link">
        <NuxtImg
          :src="post.imageUrl"
          alt="post"
          class="w-full h-full object-cover"
        />
      </NuxtLink>
      <div class="grid-post_user">
        <div v-if="showUser" class="flex items-center justify-start gap-2 flex-1">
          <Profile
            :image-url="post.user.imageUrl"
            :username="post.user.username"
          />
          <p class="line-clamp-1">
            {{ post.user.username }}
          </p>
        </div>
        <PostStats
          v-if="showStats"
          :post="post"
          :saved="userStore.savedPostIds.includes(post.id)"
        />
      </div>
    </li>
  </ul>
</template>
