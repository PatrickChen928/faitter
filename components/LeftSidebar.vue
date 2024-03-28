<script setup lang="ts">
import { userInfoState as user } from '@/store/user'
import { sidebarLinks } from '@/constants/menu'

const route = useRoute()
const activeLink = ref('')

function setActiveLink(link: string) {
  activeLink.value = link
}

watch(() => route.path, () => {
  setActiveLink(route.path)
}, { immediate: true })

async function handleLogout() {
  await logout()
}
</script>

<template>
  <nav class="leftsidebar">
    <div class="flex flex-col gap-11">
      <NuxtLink to="/" class="flex gap-3 items-center">
        <Logos class="h-10" />
      </NuxtLink>
      <NuxtLink v-if="user" :to="`/profile/${user.id}`" class="flex gap-3 items-center">
        <Profile />
        <p class="body-bold">
          {{ user.username }}
        </p>
      </NuxtLink>
      <ul class="flex flex-col gap-6">
        <li
          v-for="item in sidebarLinks"
          :key="item.route"
          class="leftsidebar-link"
          :class="{ 'bg-primary-500 text-white': activeLink === item.route }"
        >
          <NuxtLink :to="item.route" class="flex gap-4 items-center p-4 hover:invert-white">
            <NuxtImg
              :src="item.imgURL"
              :alt="item.label"
              width="24"
              height="24"
              :class="{
                'invert brightness-0': activeLink === item.route,
              }"
            />
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="flex items-center gap-2">
      <Button variant="ghost" class="flex items-center gap-2" @click="handleLogout">
        <IconLogout class="fill-primary" />
        <span class="small-medium lg:base-medium">Logout</span>
      </Button>
      <DarkToggle class="h-10 w-10 p-1" />
      <GithubLink />
    </div>
  </nav>
</template>
