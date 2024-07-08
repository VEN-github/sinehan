<template>
  <section class="pt-32 sm:pt-36 lg:pt-40 2xl:pt-44">
    <BaseContainer>
      <div class="filter-container">
        <h1 class="text-2xl font-semibold xl:text-3xl 2xl:text-4xl">My List</h1>
      </div>
      <div
        v-if="medias?.length"
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
  </section>
</template>

<script setup lang="ts">
import { useFirestore, useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'
import type { Movie, TV } from '~/types/media'

const db = useFirestore()

const myListCollection = useCollection(collection(db, 'my-list'))

const imgWidth = ref<number>(200)

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
