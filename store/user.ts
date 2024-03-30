import { acceptHMRUpdate, defineStore } from 'pinia'

interface UserInfo {
  id: string
  username: string
  email: string
  imageUrl: string
}

export const useUserStore = defineStore('userInfo', () => {
  const userInfo = ref<UserInfo>()

  function setUserInfo(newUserInfo: UserInfo) {
    userInfo.value = newUserInfo
  }

  return {
    userInfo,
    setUserInfo,
  }
})
