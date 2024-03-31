<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    default: '',
    required: true,
  },
  avatarClass: {
    type: String,
    default: 'w-10 h-10',
    required: false,
  },
  fallbackClass: {
    type: String,
    default: 'text-lg',
    required: false,
  },
})
</script>

<template>
  <NuxtLink v-if="id" :to="`/profile/${id}`">
    <Avatar class="bg-amber-500" :class="avatarClass">
      <AvatarImage
        v-if="imageUrl"
        :src="imageUrl"
        alt="avatar"
      />
      <AvatarFallback :class="fallbackClass">
        {{ username[0] }}
      </AvatarFallback>
    </Avatar>
  </NuxtLink>
</template>
