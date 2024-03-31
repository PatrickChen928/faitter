<script setup lang="ts">
import { useUserStore } from '@/store/user'

defineProps<{
  className?: {
    type: string
    default: 'w-10 h-10'
  }
}>()

const store = useUserStore()
</script>

<template>
  <NuxtLink v-if="store.user" :to="`/profile/${store.user.id}`">
    <Avatar class="bg-amber-500" :class="className">
      <AvatarImage
        v-if="store.user.imageUrl"
        :src="store.user.imageUrl"
        alt="avatar"
      />
      <AvatarFallback class="text-lg">
        {{ store.user.username[0] }}
      </AvatarFallback>
    </Avatar>
  </NuxtLink>
</template>
