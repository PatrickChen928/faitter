<script setup lang="ts">
import type { Post } from '@/types/database.types'

defineProps<{
  post: Post
  userId?: string
}>()
</script>

<template>
  <div class="flex justify-between items-center z-20">
    <div class="flex gap-2 mr-5">
      <NuxtImg
        src="/icons/liked.svg"
        width="20"
        height="20"
        alt="like"
        class="cursor-pointer"
      />
      <p class="small-medium lg:base-medium">
        0
      </p>
    </div>
    <div class="flex gap-2">
      <NuxtImg
        src="/icons/save.svg"
        width="20"
        height="20"
        alt="save"
        class="cursor-pointer"
      />
    </div>
  </div>
</template>
