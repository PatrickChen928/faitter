<template>
  <nav>
    <div class="flex-between py-4 px-5">
      <NuxtLink to="/" class="flex gap-3 items-center">
        <Logos class="w-10 h-10" />
        <span class="text-xl font-semibold font-mono">Faitter</span>
      </NuxtLink>
      <div class="flex-shrink-0 flex gap-2">
        <DarkToggle class="h-10 w-10 p-1" />
        <Button size="sm" variant="ghost" class="h-10 w-10 p-1">
          <IconLogout class=" fill-primary" />
        </Button>
      </div>
    </div>
  </nav>
</template>
