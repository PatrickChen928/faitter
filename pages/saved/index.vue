<script setup lang="ts">
const { data, status } = await useAsyncData('getSavedPosts', () => {
  return useGetSavedPostsAll()
})
</script>

<template>
  <div class="saved-container">
    <div class="flex gap-2 w-full max-w-5xl">
      <NuxtImg
        src="/icons/save.svg"
        width="36"
        height="36"
        alt="edit"
        class="icon-invert"
      />
      <h2 class="h3-bold md:h2-bold text-left w-full">
        Saved Posts
      </h2>
    </div>

    <Loader v-if="status === 'pending'" />
    <ul v-else class="w-full flex justify-center max-w-5xl gap-9">
      <p v-if="!data || data.length === 0" class="text-light-4">
        No available posts
      </p>
      <GridPostList v-else :posts="data" :show-stats="false" />
    </ul>
  </div>
</template>
