<script setup lang="ts">
import { useUserStore } from '@/store/user'

const { userInfo: user } = useUserStore()
</script>

<template>
  <NuxtLink v-if="user" :to="`/profile/${user.id}`">
    <Avatar class="bg-amber-500">
      <AvatarImage v-if="user.imageUrl" :src="user.imageUrl" alt="avatar" />
      <AvatarFallback class="text-lg">
        {{ user.username[0] }}
      </AvatarFallback>
    </Avatar>
  </NuxtLink>
</template>
