<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main class="w-full flex flex-col justify-center items-center gap-4 p-4">
    <div class="text-muted-foreground">
      Not found
    </div>
    <div>
      <Button variant="secondary" @click="router.push('/')">
        Back to home
      </Button>
    </div>
  </main>
</template>
