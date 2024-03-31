<script setup lang="ts">
import { useUserStore } from '@/store/user'

const route = useRoute()
const id = useState('routeParamId') as Ref<string>

const userStore = useUserStore()

const { data: currentUser, status } = await useAsyncData('getUserById', async () => {
  if (id.value)
    return await useGetUserById(id.value)

  return null
})
</script>

<template>
  <NuxtLayout name="default">
    <div v-if="status === 'pending' || !currentUser" class="flex-center w-full h-full">
      <Loader />
    </div>
    <div v-else class="profile-container">
      <div class="profile-inner_container">
        <div class="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <Profile
            :id="currentUser.id"
            avatar-class="w-28 h-28"
            fallback-class="text-2xl"
            :image-url="currentUser.imageUrl"
            :username="currentUser.username"
          />
          <div class="flex flex-col flex-1 justify-between md:mt-2">
            <h1 class="text-center xl:text-left h3-bold md:h1-semibold">
              {{ currentUser.username }}
            </h1>

            <div class="flex gap-8 mt-4 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock :value="currentUser.posts?.length" label="Posts" />
              <StatBlock :value="20" label="Followers" />
              <StatBlock :value="20" label="Following" />
            </div>

            <p class="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {{ currentUser.bio }}
            </p>
          </div>

          <div class="flex justify-center gap-4">
            <Button v-if="userStore.user?.id === id" variant="secondary">
              <NuxtLink
                :to="`/update-profile/${id}`"
                class="h-12 px-5 flex-center gap-2 rounded-lg"
              >
                <NuxtImg
                  src="/icons/edit.svg"
                  alt="edit"
                  width="20"
                  height="20"
                />
                <p class="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </NuxtLink>
            </Button>
            <div v-else>
              <Button type="button" variant="primary" class="px-8">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="id === userStore.user?.id" class="flex max-w-5xl w-full">
        <NuxtLink
          :to="`/profile/${id}`"
          class="profile-tab rounded-l-lg !bg-transparent"
          :class="route.path === `/profile/${id}` && '!bg-slate-300 dark:!bg-dark-1'"
        >
          <NuxtImg
            src="/icons/posts.svg"
            alt="posts"
            width="20"
            height="20"
            class="icon-invert"
          />
          Posts
        </NuxtLink>
        <NuxtLink
          :to="`/profile/${id}/liked-posts`"
          class="profile-tab rounded-r-lg !bg-muted"
          :class="route.path === `/profile/${id}/liked-posts` && '!bg-slate-300 dark:!bg-dark-1'"
        >
          <NuxtImg
            src="/icons/like.svg"
            alt="like"
            width="20"
            height="20"
            class="icon-invert"
          />
          Liked Posts
        </NuxtLink>
      </div>
      <slot />
    </div>
  </NuxtLayout>
</template>
