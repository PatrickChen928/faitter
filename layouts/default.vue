<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useUserStore } from '@/store/user'
import { UserTableName } from '@/constants/table'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const { setUserInfo, setSavedPostIds } = useUserStore()
async function getUserInfo() {
  const email = user.value?.email
  if (!email)
    return
  const { data } = await supabase.from(UserTableName).select('*').eq('email', email).single()

  if (data)
    setUserInfo(data)
}

async function getSavedPost() {
  try {
    const res = await useGetSavedPosts()
    setSavedPostIds(res.map(post => post.post))
  }
  catch (e) {

  }
}

await getUserInfo()
await getSavedPost()
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
