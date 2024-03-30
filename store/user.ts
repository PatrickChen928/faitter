import { acceptHMRUpdate, defineStore } from 'pinia'

interface UserInfo {
  id: string
  username: string
  email: string
  imageUrl: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<UserInfo>()

  function setUserInfo(newUserInfo: UserInfo) {
    user.value = newUserInfo
  }

  return {
    user,
    setUserInfo,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
