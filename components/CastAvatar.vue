<template>
  <div v-for="cast in formattedCasts" :key="cast.id" class="flex items-center gap-3 xs:flex-col">
    <a
      data-fancybox="cast"
      :href="cast.profile_path.large"
      :data-caption="`&lt;b&gt;${cast.name}&lt;/b&gt;&lt;br /&gt;${cast.character}`"
    >
      <img
        :src="cast.profile_path.medium"
        :alt="cast.name"
        class="size-10 rounded-full object-cover object-center ring-2 ring-custom-foreground sm:size-12"
      />
    </a>
    <div class="xs:text-center">
      <h3 class="text-sm md:text-base">{{ cast.name }}</h3>
      <p class="text-xs text-custom-foreground/70 md:text-sm">{{ cast.character }}</p>
    </div>
  </div>
  <div
    v-if="casts.length > 4"
    class="flex items-center gap-3 xs:col-span-full xs:flex-col xs:justify-center sm:col-auto"
  >
    <a
      href="javascript:;"
      data-fancybox-trigger="cast"
      data-fancybox-index="5"
      class="flex size-10 items-center justify-center rounded-full bg-custom-secondary/50 ring-2 ring-custom-secondary/50 sm:size-12"
    >
      <IconPlus />
    </a>
    <h3 class="text-sm xs:text-center md:text-base">More Cast</h3>
  </div>
  <div v-if="casts.length > 4" class="hidden">
    <a
      v-for="cast in casts.slice(5)"
      :key="cast.id"
      data-fancybox="cast"
      :href="cast.profile_path.large"
      :data-caption="`&lt;b&gt;${cast.name}&lt;/b&gt;&lt;br /&gt;${cast.character}`"
    >
      <img :src="cast.profile_path.medium" :alt="cast.name" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import type { Cast, Photo } from '~/types/media'

const props = defineProps<{
  casts: Cast<Photo>[]
}>()

const formattedCasts = computed<Cast<Photo>[]>(() => {
  return props.casts.slice(0, 4)
})

onMounted(() => {
  Fancybox.bind('[data-fancybox="cast"]', {})
})

onUpdated(() => {
  Fancybox.unbind('[data-fancybox="cast"]')
  Fancybox.close()

  Fancybox.bind('[data-fancybox="cast"]', {})
})

onUnmounted(() => {
  Fancybox.destroy()
})
</script>
