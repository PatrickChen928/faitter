<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useToast } from '@/components/ui/toast/use-toast'
import { CreatePostValidation } from '@/lib/form-schema'
import type { Post } from '@/types/database.types'

const props = defineProps<{
  post?: Post
}>()

const router = useRouter()
const { toast } = useToast()
const formSchema = toTypedSchema(CreatePostValidation)

const isUpdate = !!props.post

const { handleSubmit, values, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: {
    caption: props.post?.caption || '',
    file: [] as File[],
    location: props.post?.location || '',
    tags: props.post?.tags?.join(',') || '',
  },
})

const { execute, error, status } = useAsyncData('createPost', async () => {
  if (isUpdate)
    return await useUpdatePost(props.post.id, values as IPost)
  else
    return await useCreatePost(values as IPost)
}, {
  immediate: false,
})

const onSubmit = handleSubmit(async () => {
  await execute()
  if (error.value) {
    toast({
      title: 'Somethings went wrong, please try again',
      variant: 'destructive',
    })
  }
  else {
    toast({
      title: 'Post created successfully',
    })
    router.push(isUpdate ? `/posts/${props.post.id}` : '/')
  }
})

function handleFileChange(files: File[]) {
  setFieldValue('file', files)
}
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
    <FormField name="file">
      <FormItem>
        <FormLabel>Add Photos</FormLabel>
        <FormControl>
          <FileUpload
            :media-url="props.post?.imageUrl"
            @field-change="files => handleFileChange(files)"
          />
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
      <ButtonLoading variant="primary" :loading="status === 'pending'" type="submit">
        {{ isUpdate ? 'Update' : 'Create' }} Post
      </ButtonLoading>
    </div>
  </form>
</template>
