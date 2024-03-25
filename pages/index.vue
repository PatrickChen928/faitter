<script setup lang="ts">
function handleClick() {
  navigateTo('/login')
}
</script>

<template>
  <div>
    <Logos mb-6 />
    <Button @click="handleClick">
      Click me
    </Button>
  </div>
</template>
