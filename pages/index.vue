<script setup lang="ts">
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const { data: posts, status } = await useAsyncData('getPosts', async () => {
  return useGetPosts()
})

const { data: users, status: userStatus } = await useAsyncData('getTopUsers', async () => {
  return useGetUsers(10)
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
            :saved="!!userStore.savedPostIds?.includes(post.id)"
          />
        </ul>
      </div>
    </div>
    <div class="home-creators">
      <h3 class="h3-bold text-primary/80">
        Top Creators
      </h3>
      <Loader v-if="userStatus === 'pending'" />
      <ul class="grid 2xl:grid-cols-2 gap-6">
        <li v-for="user in users" :key="user.id">
          <UserCard :user="user" />
        </li>
      </ul>
    </div>
  </div>
</template>
