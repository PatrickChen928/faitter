<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main class="px-4 py-10 text-center text-teal-700 dark:text-gray-200">
    <div text-4xl>
      <div i-carbon-warning class="inline-block" />
    </div>
    <div>Not found</div>
    <div>
      <button @click="router.push('/')">
        Back to home
      </button>
    </div>
  </main>
</template>
