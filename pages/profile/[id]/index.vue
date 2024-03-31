<script setup lang="ts">
definePageMeta({
  layout: 'profile-layout',
})

const { data } = await useAsyncData('getPosts', () => {
  return useGetSelfPosts()
})
</script>

<template>
  <GridPostList :posts="data || []" :show-user="false" />
</template>
