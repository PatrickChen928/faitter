<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useToast } from '@/components/ui/toast/use-toast'
import { CreatePostValidation } from '@/lib/form-schema'

const formSchema = toTypedSchema(CreatePostValidation)
const loading = ref(false)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {

})
</script>

<template>
  <form class="flex flex-col gap-9 w-full max-w-5xl" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="caption">
      <FormItem>
        <FormLabel>
          Caption
        </FormLabel>
        <FormControl>
          <Textarea placeholder="Please enter your caption" class="shad-textarea custom-scrollbar" v-bind="componentField" />
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
      Create Post
    </ButtonLoading>
  </form>
</template>
