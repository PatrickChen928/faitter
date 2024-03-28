<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { SignUpValidation } from '@/lib/form-schema'
import { useToast } from '@/components/ui/toast/use-toast'

definePageMeta({
  layout: 'auth',
})

const router = useRouter()
const { toast } = useToast()

const formSchema = toTypedSchema(SignUpValidation)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const form = ref({
  username: '',
  email: '',
  password: '',
})
const { execute, status, error } = await useAsyncData('signup', () => {
  return $fetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify(form.value),
  })
}, {
  immediate: false,
})

const onSubmit = handleSubmit(async (values) => {
  form.value = {
    username: values.username.trim(),
    email: values.email.trim(),
    password: values.password.trim(),
  }
  await execute()
  if (error.value) {
    toast({
      title: error.value.message,
      variant: 'destructive',
    })
    return
  }
  router.push('/login')
})
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center">
    <NuxtImg src="/logo.svg" />
    <h2 class="h3-bold md:h2-bold pt-2">
      Create a new account
    </h2>
    <p class="text-muted-foreground small-medium md:base-regular">
      To use Faitch enter your details
    </p>
    <form class="mt-4 w-full max-w-[420px] px-10" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Please enter your name" class="shad-input" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
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
      <ButtonLoading variant="primary" type="submit" class="w-full mt-4" :loading="status === 'pending'">
        Sign up
      </ButtonLoading>
      <p class="small-regular text-muted-foreground text-center mt-2">
        Already have an account? <NuxtLink to="/login" class="text-primary-500 small-semibold ml-1">
          Log in
        </NuxtLink>
      </p>
    </form>
  </div>
</template>
