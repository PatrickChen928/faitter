<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
  <main class="h-full w-full">
    <div class="flex h-full">
      <div class="flex-1 h-full">
        <slot />
      </div>
      <NuxtImg
        src="/img/login-bg.jpg"
        alt="login"
        class="hidden lg:block w-1/2 h-full object-cover"
      />
    </div>
    <Toaster />
  </main>
</template>
