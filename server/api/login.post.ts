import { createError } from 'h3'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '@/types/database.types'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  const client = await serverSupabaseClient<Database>(event)

  const { error } = await client.auth.signInWithPassword({
    email,
    password,
  })

  if (error)
    throw createError({ statusMessage: error.message })

  return {
    success: true,
  }
})
