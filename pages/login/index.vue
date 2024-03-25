<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { SignInValidation } from '@/lib/form-schema'
import { login } from '@/lib/services/auth-service'

const formSchema = toTypedSchema(SignInValidation)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  login(values)
})
</script>

<template>
  <div class="flex h-full">
    <div class="flex-1 flex flex-col justify-center items-center">
      <NuxtImg src="/logo.svg" />
      <h2 class="h3-bold md:h2-bold">
        Welcome to Faitter!
      </h2>
      <form class="w-full max-w-[360px] p-10" @submit="onSubmit">
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
        <Button type="submit" class="block mt-4 mx-auto">
          Login
        </Button>
      </form>
    </div>
    <NuxtImg
      src="/img/login-bg.jpg"
      alt="login"
      class="hidden lg:block w-1/2 h-full object-cover"
    />
  </div>
</template>
