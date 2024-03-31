<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import { useUserStore } from '@/store/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const id = (route.params as { id: string }).id
const { data: post, status } = await useAsyncData('getPostDetail', () => {
  return useGetPostDetail(id)
})

function handleDeletePost() {
  useDeletePost(id)
  router.push('/')
}
</script>

<template>
  <div class="post_details-container">
    <Loader v-if="status === 'pending' || !post" />
    <div v-else class="post_details-card">
      <NuxtImg
        :src="post.imageUrl"
        alt="post"
        class="post_details-img"
      />
      <div class="post_details-info">
        <div class="flex-between w-full">
          <NuxtLink
            :to="`/profile/${post.creator}`"
            class="flex items-center gap-3"
          >
            <Profile
              :image-url="post.user.imageUrl"
              :username="post.user.username"
            />
            <div class="flex flex-col">
              <p>{{ post.user.username }}</p>
              <div class="flex-center gap-2 text-muted-foreground">
                <p class="subtle-semibold lg:small-regular">
                  {{ formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) }}
                </p>
                -
                <p class="subtle-semibold lg:small-regular">
                  {{ post.location }}
                </p>
              </div>
            </div>
          </NuxtLink>
          <div v-if="userStore.user?.id === post.creator" class="flex-center gap-2">
            <Button
              variant="ghost"
              class="p-2"
            >
              <NuxtLink :to="`/update-post/${post.id}`">
                <NuxtImg
                  src="/icons/edit.svg"
                  alt="edit"
                  width="24"
                  height="24"
                />
              </NuxtLink>
            </Button>

            <Button
              variant="ghost"
              class="p-2"
              @click="handleDeletePost"
            >
              <NuxtImg
                src="/icons/delete.svg"
                alt="delete"
                width="24"
                height="24"
              />
            </Button>
          </div>
        </div>
        <hr class="border w-full ">
        <div class="flex flex-col flex-1 w-full small-medium lg:base-medium py-5">
          <p>
            {{ post.caption }}
          </p>
          <ul v-if="post.tags && post.tags.length" class="flex gap-1 mt-2">
            <li v-for="(tag, index) in post.tags" :key="index" class="text-muted-foreground">
              #{{ tag }}
            </li>
          </ul>
        </div>
        <div class="w-full">
          <PostStats
            :post="post"
            :user-id="userStore.user?.id"
            :saved="userStore.savedPostIds?.includes(post.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
