<template>
  <div class="flex items-center gap-x-2 md:gap-x-4">
    <Dialog v-model:open="open">
      <DialogTrigger as-child>
        <button type="button" class="flex items-center gap-x-2">
          <IconSearch :size="20" stroke-width="1.5" />
          <p class="hidden md:block">
            Search
            <kbd
              class="font-mono pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 text-[10px] font-medium opacity-100"
            >
              <span class="text-xs">CTRL</span>K
            </kbd>
          </p>
        </button>
      </DialogTrigger>
      <DialogContent class="!gap-0 !border-none bg-white !px-2 !py-0 text-custom-bg">
        <DialogHeader class="mr-10 mt-1">
          <DialogTitle>
            <div class="relative w-full items-center">
              <Input
                id="search"
                v-model.trim="search"
                type="text"
                placeholder="Search for movies, TV shows and more..."
                class="!border-none bg-transparent pl-10 !ring-0 !ring-offset-0"
              />
              <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
                <IconSearch class="size-6 text-muted-foreground" />
              </span>
            </div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div v-if="search" class="border-t border-t-custom-secondary py-2">
          <div v-if="pending" class="grid h-[10vh] place-items-center">
            <IconLoaderCircle class="animate-spin text-custom-primary" :size="52" />
          </div>
          <div
            v-else-if="searchResults?.results?.length === 0"
            class="grid h-[10vh] place-items-center font-medium"
          >
            No results found.
          </div>
          <ul
            v-else
            class="grid h-96 grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] gap-1.5 overflow-y-auto"
          >
            <li v-for="item in searchResults?.results" :key="item.id">
              <NuxtLink :to="`/${useSlug(item)}/${item.id}`" @click="handleOpenChange">
                <img
                  :src="item.poster_path"
                  :alt="useTitle(item)"
                  class="h-48 w-36 rounded object-cover"
                />
              </NuxtLink>
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
    <Separator orientation="vertical" class="hidden !h-5 lg:block" />
    <ClientOnly fallback-tag="span" fallback="Loading...">
      <BaseAvatar />
    </ClientOnly>
    <MenuButton @toggle-menu="emit('toggleMenu')" />
  </div>
</template>

<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'
import type { APIResponse } from '~/types/api'
import type { Movie, TV } from '~/types/media'

const emit = defineEmits(['toggleMenu'])

const open = ref<boolean>(false)
const search = ref<string>('')

const { Meta_K, Ctrl_K } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) e.preventDefault()
  }
})

watch([Meta_K, Ctrl_K], (v) => {
  if (!(v[0] || v[1])) handleOpenChange()
})

watch(open, (v) => {
  if (!v) search.value = ''
})

function handleOpenChange() {
  open.value = !open.value
}

const { data: searchResults, pending } = await useAsyncData(
  `search:${search.value}`,
  () =>
    $fetch<APIResponse<(Movie | TV)[]>>('/api/search', {
      params: {
        search: search.value
      }
    }),
  {
    watch: [search]
  }
)
</script>
