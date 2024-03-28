<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useToast } from '@/components/ui/toast/use-toast'
import { SignInValidation } from '@/lib/form-schema'

definePageMeta({
  layout: 'auth',
})

const supabase = useSupabaseClient()
const loading = ref(false)
const router = useRouter()
const { toast } = useToast()

const formSchema = toTypedSchema(SignInValidation)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  loading.value = true
  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  })
  loading.value = false
  if (error) {
    toast({
      title: error.message,
      variant: 'destructive',
    })
    return
  }
  router.push('/')
})
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center">
    <Logos class="h-20" hidden-title />
    <h2 class="h3-bold md:h2-bold pt-2">
      Welcome to Faitter!
    </h2>
    <form class="mt-4 w-full max-w-[420px] px-10" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="Please enter your email" class="shad-input" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="Please enter your password" class="shad-input" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <ButtonLoading variant="primary" :loading="loading" type="submit" class="w-full mt-4">
        Login
      </ButtonLoading>
      <p class="small-regular text-muted-foreground text-center mt-2">
        Don't have an account? <NuxtLink to="/signup" class="text-primary-500 small-semibold ml-1">
          Sign up
        </NuxtLink>
      </p>
    </form>
  </div>
</template>
