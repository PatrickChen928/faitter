interface UserInfo {
  id: string
  username: string
  email: string
  imageUrl: string
}

export const userInfoState = useState<UserInfo | null>('userInfo', () => null)
