import { createError } from 'h3'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '@/types/database.types'
import { UserTableName } from '@/constants/table'

export default defineEventHandler(async (event) => {
  const { email, password, username } = await readBody(event)

  const client = await serverSupabaseClient<Database>(event)

  const { error } = await client.auth.signUp({
    email,
    password,
  })

  if (error)
    throw createError({ statusMessage: error.message })

  await client.from(UserTableName).insert({
    username,
    email,
  })

  return {
    success: true,
  }
})
