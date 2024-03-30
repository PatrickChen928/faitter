<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
import { userInfoState } from '@/store/user'
import { UserTableName } from '@/constants/table'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
async function getUserInfo() {
  const email = user.value?.email
  if (!email)
    return
  const { data } = await supabase.from(UserTableName).select('*').eq('email', email).single()

  if (data)
    userInfoState.value = data
}

onMounted(() => {
  getUserInfo()
})
</script>

<template>
  <main class="h-full w-full md:flex">
    <Topbar />
    <LeftSidebar />
    <section class="flex flex-1 h-full">
      <slot />
    </section>
    <Bottombar />

    <Toaster />
  </main>
</template>
