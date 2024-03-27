<script setup lang="ts">
const supabase = useSupabaseClient()
function handleClick() {
  navigateTo('/login')
}
function handleLogout() {
  supabase.auth.signOut()
}
</script>

<template>
  <div>
    <Logos mb-6 />
    <Button @click="handleClick">
      Click me
    </Button>
    <Button @click="handleLogout">
      Logout
    </Button>
  </div>
</template>
