<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
  <main class="h-full w-full">
    <slot />
    <Toaster />
  </main>
</template>
