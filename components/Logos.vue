<script setup lang="ts">
defineProps({
  hiddenTitle: Boolean,
})
</script>

<template>
  <div class="flex items-center gap-2 cursor-default text-2xl">
    <NuxtImg src="/logo.svg" class="h-full" />
    <span v-if="!hiddenTitle" class="font-semibold font-mono">Faitter</span>
  </div>
</template>
