<script setup lang="ts">
import { bottombarLinks } from '~/constants/menu'

const route = useRoute()
const activeLink = ref('')

function setActiveLink(link: string) {
  activeLink.value = link
}

watch(() => route.path, () => {
  setActiveLink(route.path)
}, { immediate: true })
</script>

<template>
  <section class="bottom-bar">
    <NuxtLink
      v-for="item in bottombarLinks"
      :key="item.route" :to="item.route"
      class="flex-center flex-col gap-1 p-2 transition"
      :class="{ 'bg-primary-500 text-white rounded-[10px]': activeLink === item.route }"
    >
      <NuxtImg
        :src="item.imgURL"
        :alt="item.label"
        width="16"
        height="16"
        :class="{
          'invert brightness-0': activeLink === item.route,
        }"
      />
      <p class="tiny-medium">
        {{ item.label }}
      </p>
    </NuxtLink>
  </section>
</template>
