<script setup lang="ts">
import type { User } from '@/types/database.types'
import { useToast } from '@/components/ui/toast'

defineProps<{
  user: User
}>()

const { toast } = useToast()

function handleFollow(e: any) {
  e.stopPropagation()
  e.preventDefault()
  toast({
    title: 'Not implemented yet!',
  })
}
</script>

<template>
  <NuxtLink :to="`/profile/${user.id}`" class="user-card">
    <Profile
      :id="user.id"
      :image-url="user.imageUrl"
      :username="user.username"
      avatar-class="rounded-full w-14 h-14"
    />

    <p class="base-medium text-center line-clamp-1">
      {{ user.username }}
    </p>

    <Button variant="primary" type="button" size="sm" class="px-5" @click="handleFollow">
      Follow
    </Button>
  </NuxtLink>
</template>
