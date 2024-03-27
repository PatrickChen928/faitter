<script setup lang="ts">
defineProps<{
  loading: boolean
  className?: string
  type?: string
}>()
</script>

<template>
  <Button :type="type" :disabled="loading" class="flex items-center gap-2">
    <NuxtImg v-if="loading" src="/img/loading.svg" class="h-6 w-6" />
    <slot />
  </Button>
</template>
