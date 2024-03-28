<script setup lang="ts">
async function handleLogout() {
  await logout()
}
</script>

<template>
  <section class="topbar">
    <div class="flex-between py-4 px-5">
      <NuxtLink to="/" class="flex gap-3 items-center">
        <Logos class="w-10 h-10" />
      </NuxtLink>
      <div class="flex-shrink-0 flex items-center gap-2">
        <DarkToggle class="h-10 w-10 p-1" />
        <Button size="sm" variant="ghost" class="h-10 w-10 p-1 shad-button_ghost" @click="handleLogout">
          <IconLogout class="fill-primary" />
        </Button>
        <Profile />
      </div>
    </div>
  </section>
</template>
