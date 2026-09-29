<template>
  <div class="flex gap-4">
    <img
      class="h-[12.rem] w-28 cursor-pointer rounded-lg object-cover drop-shadow-2xl transition-opacity hover:opacity-70 xs:h-52 xs:w-32 md:h-56 md:w-36 xl:h-60 2xl:h-64"
      :src="media.poster_path"
      :alt="title"
      role="link"
      @click="onNavigate"
    />
    <div>
      <NuxtLink
        :to="`/${slug}/${media.id}`"
        :title="title"
        class="line-clamp-2 font-semibold transition-colors hover:text-custom-primary sm:text-xl xl:text-2xl"
      >
        {{ title }}
      </NuxtLink>
      <p class="mt-1 space-x-4 text-sm sm:text-base">
        <span class="text-custom-foreground-secondary">{{ releaseDate }}</span>
        <span v-if="rating" class="rounded bg-custom-primary px-1.5 font-medium">
          {{ rating }}
        </span>
      </p>
      <p
        v-if="media.overview"
        :title="media.overview"
        class="mt-2 line-clamp-2 text-xs font-light sm:line-clamp-5 sm:text-sm md:line-clamp-2 xl:line-clamp-4 2xl:line-clamp-5"
      >
        {{ media.overview }}
      </p>
      <div
        class="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 md:flex-col xl:flex-row"
      >
        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors hover:text-custom-primary"
          @click="addToMyList"
        >
          <IconCheckCircle v-if="isOnMyList" stroke-width="1.5" :size="16" />
          <IconPlusCircle v-else stroke-width="1.5" :size="16" />
          <span>My List</span>
        </button>
        <Button
          size="sm"
          class="rounded-full bg-custom-primary hover:bg-custom-primary/90"
          as-child
        >
          <NuxtLink :to="`/${slug}/${media.id}?play=1`">
            <IconPlayCircle stroke-width="1.5" :size="16" />
            <span class="pl-2 font-medium">Watch Now</span>
          </NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFirestore } from 'vuefire'
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { useToast } from '@/components/ui/toast/use-toast'
import type { Movie, TV } from '~/types/media'

const props = defineProps({
  media: {
    type: Object as PropType<Movie | TV>,
    required: true
  }
})

const db = useFirestore()
const { toast } = useToast()
const myListCollection = import.meta.client ? useCollection(collection(db, 'my-list')) : ref([])
const slug = useSlug(props.media)
const title = useTitle(props.media)
const releaseDate = useReleaseDate(props.media)
const rating = useRating(props.media)

const isOnMyList = computed(() => {
  if (myListCollection.value) {
    return myListCollection.value?.find(doc => doc.media_id == props.media?.id)
  }
  return false
})

async function addToMyList() {
  if (isOnMyList.value) {
    await deleteDoc(doc(db, 'my-list', isOnMyList.value?.id))
    toast({
      description: 'Removed from My List'
    })
    return
  }

  const newDoc = await addDoc(collection(db, 'my-list'), {
    media_id: props.media?.id.toString(),
    ...props.media
  })

  if (newDoc.id) {
    toast({
      description: 'Added to My List'
    })
  }
}

function onNavigate() {
  navigateTo({ path: `/${slug}/${props.media.id}` })
}
</script>
