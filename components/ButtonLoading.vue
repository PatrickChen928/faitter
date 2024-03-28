<script setup lang="ts">
import type { ButtonVariants } from '@/components/ui/button'

defineProps<{
  loading: boolean
  className?: string
  type?: string
  size?: ButtonVariants['size']
  variant?: ButtonVariants['variant']
}>()
</script>

<template>
  <Button :variant="variant" :type="type" :disabled="loading" class="flex items-center gap-2">
    <NuxtImg v-if="loading" src="/img/loading.svg" class="h-6 w-6" />
    <slot />
  </Button>
</template>
