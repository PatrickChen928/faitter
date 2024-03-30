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
    <FormField v-slot="{ componentField }" name="file">
      <FormItem>
        <FormLabel>Add Photos</FormLabel>
        <FormControl>
          <FileUpload v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="location">
      <FormItem>
        <FormLabel>
          Add Location
        </FormLabel>
        <FormControl>
          <Input type="text" placeholder="Please enter your location" class="shad-input" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="tags">
      <FormItem>
        <FormLabel>
          Add Tags (separated by comma " , ")
        </FormLabel>
        <FormControl>
          <Input type="text" placeholder="JS, Vue, NuxtJS, React, NextJS" class="shad-input" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="flex items-center gap-4 justify-end">
      <Button type="button" class="shad-button_dark_4">
        Cancel
      </Button>
      <ButtonLoading variant="primary" :loading="loading" type="submit">
        Submit
      </ButtonLoading>
    </div>
  </form>
</template>
