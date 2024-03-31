import { acceptHMRUpdate, defineStore } from 'pinia'

interface UserInfo {
  id: string
  username: string
  email: string
  imageUrl: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<UserInfo>()
  const savedPostIds = ref<string[]>([])

  function setUserInfo(newUserInfo: UserInfo) {
    user.value = newUserInfo
  }
  function setSavedPostIds(ids: string[]) {
    savedPostIds.value.push(...ids)
  }

  return {
    user,
    savedPostIds,
    setUserInfo,
    setSavedPostIds,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
