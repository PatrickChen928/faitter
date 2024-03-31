<script setup lang="ts">
import type { Post } from '@/types/database.types'

defineProps({
  isSearching: {
    type: Boolean,
    required: true,
  },
  searchResults: {
    type: Array as PropType<Post[]>,
    required: true,
  },
})
</script>

<template>
  <Loader v-if="isSearching" />
  <GridPostList v-else-if="searchResults && searchResults.length" :posts="searchResults" />
  <p v-else class="mt-10 text-center w-full text-primary/60">
    No results found
  </p>
</template>
