<script setup lang="ts">
import type { User } from '@/types/database.types'

defineProps<{
  user: User
}>()
</script>

<template>
  <NuxtLink :to="`/profile/${user.id}`" class="user-card">
    <NuxtImg
      :src="user.imageUrl || '/icons/profile-placeholder.svg'"
      alt="creator"
      class="rounded-full w-14 h-14"
    />

    <p class="base-medium text-light-1 text-center line-clamp-1">
      {{ user.username }}
    </p>

    <Button variant="primary" type="button" size="sm" class="px-5">
      Follow
    </Button>
  </NuxtLink>
</template>
