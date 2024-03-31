<script setup lang="ts">
definePageMeta({
  layout: 'profile-layout',
})

const { data, status } = await useAsyncData('getLikedPosts', () => {
  return useGetLikedPosts()
})
</script>

<template>
  <div v-if="status === 'pending'" class="flex-center h-full">
    <Loader />
  </div>
  <p v-else-if="!data || data.length === 0" class="text-primary/60">
    No liked posts
  </p>
  <GridPostList
    v-else
    :posts="data" :show-stats="false"
  />
</template>
