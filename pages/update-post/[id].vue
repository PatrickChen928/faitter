<script setup lang="ts">
const route = useRoute()

const id = (route.params as { id: string }).id;

const { data } = await useAsyncData('getPostDetail', () => {
  return useGetPostDetail(id)
})
</script>

<template>
  <div class="flex flex-1">
    <div class="common-container">
      <div class="max-w-5xl flex-start gap-3 justify-start w-full">
        <NuxtImg
          src="/icons/add-post.svg"
          alt="add"
          width="36"
          height="36"
        />
        <h2 class="h3-bold md:h2-bold text-left w-full">
          Edit Post
        </h2>
      </div>
      <PostForm :post="data!" />
    </div>
  </div>
</template>
