<script setup lang="ts">
import { useDropzone } from 'vue3-dropzone'

const props = defineProps<{
  mediaUrl?: string
}>()

const emit = defineEmits(['fieldChange'])

const fileUrl = ref<string>(props.mediaUrl || '')

function onDrop(files: any[]) {
  const file = files[0]
  fileUrl.value = URL.createObjectURL(file)
  emit('fieldChange', files)
}

const { getRootProps, getInputProps } = useDropzone({
  onDrop,
  accept: ['.png', '.jpg', '.jpeg', '.svg'],
})
</script>

<template>
  <div v-bind="getRootProps()" class="flex flex-center flex-col dark:bg-dark-3 rounded-xl border cursor-pointer">
    <input v-bind="getInputProps()" class="cursor-pointer">
    <template v-if="fileUrl">
      <div class="flex flex-1 justify-center w-full p-5 lg:p-10">
        <NuxtImg
          :src="fileUrl"
          alt="image"
          class="file_uploader-img"
        />
      </div>
      <p class="file_uploader-label">
        Click or drag photo to replace
      </p>
    </template>
    <div v-else class="file_uploader-box">
      <NuxtImg
        src="/icons/file-upload.svg"
        class="icon-invert"
        width="96"
        height="77"
      />
      <h3 class="base-medium mb-2 mt-6 text-primary/80">
        Drag photo here
      </h3>
      <p class="small-regular mb-6 text-muted-foreground">
        SVG, PNG, JPG
      </p>
      <Button variant="secondary">
        Select from computer
      </Button>
    </div>
  </div>
</template>
