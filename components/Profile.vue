<script setup lang="ts">
import { useUserStore } from '@/store/user'

const store = useUserStore()
</script>

<template>
  <NuxtLink v-if="store.user" :to="`/profile/${store.user.id}`">
    <Avatar class="bg-amber-500">
      <AvatarImage v-if="store.user.imageUrl" :src="store.user.imageUrl" alt="avatar" />
      <AvatarFallback class="text-lg">
        {{ store.user.username[0] }}
      </AvatarFallback>
    </Avatar>
  </NuxtLink>
</template>
