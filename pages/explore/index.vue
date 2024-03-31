<script setup lang="ts">
import type { Post } from '@/types/database.types'

const searchValue = ref('')
const page = ref(0)
const isLastPage = ref(false)
const searchResults = ref<Post[]>([])
const isSearching = ref(false)
const target = ref<HTMLElement | null>(null)
const pagedPosts = ref<Post[]>([])

let stopFn: () => void

const { status } = await useAsyncData('getInfinitePosts', async () => {
  if (isLastPage.value)
    return
  const res = await useGetInfinitePosts(page.value)
  if (!res || res.length === 0) {
    stopFn?.()
    isLastPage.value = true
  }
  pagedPosts.value.push(...res)
  return res
}, {
  watch: [page],
})

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting)
      page.value++
  },
)
stopFn = stop

const doSearch = useDebounceFn(async () => {
  try {
    searchResults.value = await useSearchPosts(searchValue.value)
    isSearching.value = false
  }
  catch (e: any) {
    console.error(e)
  }
  finally {
    isSearching.value = false
  }
}, 500)

function handleSearch() {
  searchResults.value = []
  isSearching.value = true
  doSearch()
}
</script>

<template>
  <div v-if="status === 'pending'" class="flex-center w-full h-full">
    <Loader />
  </div>
  <div v-else class="explore-container">
    <div class="explore-inner_container">
      <h2 class="h3-bold md:h2-bold w-full">
        Search Posts
      </h2>
      <div class="flex gap-1 px-4 w-full rounded-lg bg-slate-300 dark:bg-dark-4">
        <NuxtImg
          src="/icons/search.svg"
          alt="search"
          width="24"
          height="24"
        />
        <Input
          v-model="searchValue"
          type="text"
          placeholder="Search"
          class="explore-search"
          @input="handleSearch"
        />
      </div>
    </div>
    <div class="flex-between w-full max-w-5xl mt-16 mb-7">
      <h3 class="body-bold md:h3-bold">
        Popular Today
      </h3>
      <div class="flex-center gap-3 bg-slate-200 dark:bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
        <p class="small-medium md:base-medium text-muted-foreground">
          All
        </p>
        <NuxtImg
          src="/icons/filter.svg"
          alt="filter"
          width="20"
          height="20"
        />
      </div>
    </div>
    <div class="flex flex-wrap gap-9 w-full max-w-5xl">
      <SearchResults
        v-if="searchValue !== ''"
        :is-searching="isSearching"
        :search-results="searchResults"
      />
      <GridPostList
        v-else
        :posts="pagedPosts || []"
      />
      <p v-if="isLastPage && !searchValue" class="mt-10 text-center w-full text-muted-foreground">
        End of posts
      </p>
    </div>
    <div v-if="!isLastPage && !searchValue" ref="target" class="mt-10">
      <Loader />
    </div>
  </div>
</template>
