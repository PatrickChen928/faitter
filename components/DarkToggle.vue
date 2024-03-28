<script setup lang="ts">
const color = useColorMode()

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#ffffff',
  }],
})

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <Button size="sm" variant="ghost" @click="toggleDark">
    <IconMoon v-if="color.value === 'dark'" />
    <IconSun v-else class=" fill-primary" />
  </Button>
</template>
