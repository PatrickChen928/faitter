<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import type { Post } from '@/types/database.types'
import { useUserStore } from '@/store/user'

defineProps<{
  post: Post
  saved: boolean
}>()

const userStore = useUserStore()
</script>

<template>
  <div class="post-card">
    <div class="flex-between">
      <div class="flex items-center gap-3">
        <NuxtLink
          :to="`/profile/${post.creator}`"
          class="flex items-center gap-2"
        >
          <Profile />
        </NuxtLink>
        <div class="flex flex-col">
          <p>{{ post.user.username }}</p>
          <div class="flex-center gap-2 text-muted-foreground">
            <p class="subtle-semibold lg:small-regular">
              {{ formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) }}
            </p>
            -
            <p class="subtle-semibold lg:small-regular">
              {{ post.location }}
            </p>
          </div>
        </div>
      </div>
      <NuxtLink
        :to="`/update-post/${post.id}`"
        class="flex items-center gap-2"
        :class="{
          hidden: post.creator !== userStore.user?.id,
        }"
      >
        <NuxtImg
          src="/icons/edit.svg"
          alt="edit"
          width="20"
          height="20"
          class="icon-invert"
        />
      </NuxtLink>
    </div>
    <NuxtLink :to="`/posts/${post.id}`">
      <div class="small-medium lg:base-medium py-5">
        <p>{{ post.caption }}</p>
        <ul v-if="post.tags && post.tags.length" class="flex gap-1 mt-2">
          <li v-for="(tag, index) in post.tags" :key="index" class="text-muted-foreground">
            #{{ tag }}
          </li>
        </ul>
      </div>
      <NuxtImg
        :src="post.imageUrl || '/icons/profile-placeholder.svg'"
        class="post-card_img"
        alt="post image"
      />
    </NuxtLink>
    <PostStats
      :post="post"
      :user-id="userStore.user?.id"
      :saved="saved"
    />
  </div>
</template>
