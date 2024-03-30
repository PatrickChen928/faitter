<script setup lang="ts">
const { data: posts, status } = useAsyncData('getPosts', async () => {
  return await useGetPosts()
}, {
  immediate: true,
})
</script>

<template>
  <div class="flex flex-1">
    <div class="home-container">
      <div class="home-posts">
        <h2 class="h3-bold md:h2-bold text-left w-full">
          Home Feed
        </h2>
        <div v-if="status === 'pending' && !posts" class="flex flex-center flex-col w-full">
          <!-- <NuxtLoading /> -->
          loading
        </div>
        <ul v-else class="flex flex-col flex-1 gap-9 w-full">
          <PostCard
            v-for="post in posts"
            :key="post.id"
            :post="post"
          />
        </ul>
      </div>
    </div>
  </div>
</template>
