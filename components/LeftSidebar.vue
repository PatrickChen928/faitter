<script setup lang="ts">
import { userInfoState as user } from '@/store/user'
import { sidebarLinks } from '@/constants/menu'
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
          v-for="item in sidebarLinks" :key="item.route" class="leftsidebar-link group"
        >
          <NuxtLink :to="item.route" class="flex gap-4 items-center p-4 group-hover:invert-white">
            <NuxtImg :src="item.imgURL" :alt="item.label" />
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
