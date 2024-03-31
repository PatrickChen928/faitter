<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useToast } from '@/components/ui/toast/use-toast'
import { UpdateProfileValidation } from '@/lib/form-schema'

const route = useRoute()
const id = (route.params as any).id

const { toast } = useToast()
const formSchema = toTypedSchema(UpdateProfileValidation)

const self = await useGetUserById(id)

const { handleSubmit, values, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: {
    bio: self.bio || '',
    file: [] as File[],
  },
})

const { execute, error, status } = useAsyncData('updateUser', () => {
  return useUpdateUser(values as IUser)
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
    return
  }
  navigateTo(`/profile/${id}`)
})

function handleFileChange(files: File[]) {
  setFieldValue('file', files)
}
</script>

<template>
  <div class="flex flex-1">
    <div class="common-container">
      <div class="flex-start gap-3 justify-start w-full max-w-5xl">
        <NuxtImg
          src="/icons/edit.svg"
          width="36"
          height="36"
          alt="edit"
        />
        <h2 class="h3-bold md:h2-bold text-left w-full">
          Edit Profile
        </h2>
      </div>
      <form class="flex flex-col gap-9 w-full max-w-5xl" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="bio">
          <FormItem>
            <FormLabel>
              bio
            </FormLabel>
            <FormControl>
              <Textarea placeholder="Please enter your bio" class="shad-textarea custom-scrollbar" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="file">
          <FormItem>
            <FormLabel>Add Photos</FormLabel>
            <FormControl>
              <FileUpload
                :media-url="self?.imageUrl"
                @field-change="files => handleFileChange(files)"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex items-center gap-4 justify-end">
          <Button type="button" class="shad-button_dark_4">
            Cancel
          </Button>
          <ButtonLoading variant="primary" :loading="status === 'pending'" type="submit">
            Update Profile
          </ButtonLoading>
        </div>
      </form>
    </div>
  </div>
</template>
