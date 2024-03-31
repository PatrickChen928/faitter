<script setup lang="ts">
const { data, status }  = await useAsyncData('getUsers', () => {
  return useGetUsers()
})
</script>

<template>
   <div class="common-container">
      <div class="user-container">
        <h2 class="h3-bold md:h2-bold text-left w-full">All Users</h2>
          <Loader v-if="status === 'pending' && !data" />
          <ul class="user-grid">
            <li 
              v-for="user in data" 
              :key="user.id" 
              class="flex-1 min-w-[200px] w-full"
            >
              <UserCard :user="user" />
            </li>
          </ul>
      </div>
    </div>
</template>
