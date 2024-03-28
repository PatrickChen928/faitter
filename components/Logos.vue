<script setup lang="ts">
defineProps({
  hiddenTitle: Boolean,
  width: {
    type: String,
    default: '40',
  },
  height: {
    type: String,
    default: '40',
  },
})
</script>

<template>
  <div class="flex items-center gap-2 cursor-default text-2xl">
    <img
      src="/logo.svg"
      :width="width"
      :height="height"
    >
    <span v-if="!hiddenTitle" class="font-semibold font-mono">Faitter</span>
  </div>
</template>
