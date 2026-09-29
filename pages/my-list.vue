<template>
  <section class="pt-32 sm:pt-36 lg:pt-40 2xl:pt-44">
    <ClientOnly fallback-tag="div">
      <BaseContainer>
        <div class="filter-container">
          <h1 class="text-2xl font-semibold xl:text-3xl 2xl:text-4xl">My List</h1>
        </div>
        <div v-if="isLoading" class="grid h-96 place-items-center">
          <IconLoaderCircle class="animate-spin text-custom-primary" :size="64" />
        </div>
        <div
          v-else-if="medias?.length > 0"
          class="mt-8 grid grid-cols-2 place-items-center gap-8 xs:gap-4 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4 xl:grid-cols-5"
        >
          <template v-for="media in medias" :key="media.id">
            <MediaCardGrid :media="media" :img-width="imgWidth" />
          </template>
        </div>
        <div v-else class="flex flex-col items-center justify-center py-16 text-center">
          <IconArchiveX :size="48" />
          <h1 class="mt-5 text-2xl font-bold tracking-tight sm:text-5xl">No results found.</h1>
          <p class="text-custom-foreground-secondary mb-6 mt-2">
            Sorry, we couldn't find any data matching your request.
          </p>
          <Button class="bg-custom-primary hover:bg-custom-primary/90" @click="onNavigate">
            Browse Now
          </Button>
        </div>
      </BaseContainer>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import { useFirestore, useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'
import type { Movie, TV } from '~/types/media'

const db = useFirestore()

const myListCollection = import.meta.client ? useCollection(collection(db, 'my-list')) : ref([])

const imgWidth = ref<number>(200)

const isLoading = computed(() => {
  if (!import.meta.client || !('pending' in myListCollection)) return false

  return myListCollection.pending.value
})

const medias = computed(() => {
  myListCollection.value.forEach((doc) => {
    doc.id = parseInt(doc.media_id)
  })

  return myListCollection.value as (Movie | TV)[]
})

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

function handleResize() {
  imgWidth.value = window.innerWidth < 768 ? 342 : 200
}

function onNavigate() {
  navigateTo({ path: '/movies' })
}
</script>
