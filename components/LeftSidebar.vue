<script setup lang="ts">
import { userInfoState as user } from '@/store/user'
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
    </div>
  </nav>
</template>
