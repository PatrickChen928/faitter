<script setup lang="ts">
definePageMeta({
  layout: 'profile-layout',
})

const { data, status } = await useAsyncData('getPosts', () => {
  return useGetSelfPosts()
})
</script>

<template>
  <div v-if="status === 'pending'" class="flex w-full items-center justify-center">
    <Loader />
  </div>
  <p v-else-if="!data || data.length === 0" class="text-primary/60">
    No posts
  </p>
  <GridPostList v-else :posts="data || []" :show-user="false" />
</template>
