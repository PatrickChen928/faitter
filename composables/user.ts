export async function logout() {
  const supabase = useSupabaseClient()
  const router = useRouter()
  await supabase.auth.signOut()
  router.push('/login')
}
