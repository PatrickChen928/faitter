<script setup lang="ts">
defineProps({
  value: {
    type: Number,
    required: false,
  },
  label: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="flex-center gap-2">
    <p class="small-semibold lg:body-bold text-primary-500">
      {{ value || 0 }}
    </p>
    <p class="small-medium lg:base-medium text-light-2">
      {{ label }}
    </p>
  </div>
</template>
