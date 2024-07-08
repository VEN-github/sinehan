<template>
  <div class="rounded-md border-2 border-custom-secondary bg-custom-secondary/20 p-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <Avatar class="border border-custom-foreground">
          <AvatarImage
            v-if="review.author_details?.avatar_path?.small"
            :src="review.author_details?.avatar_path?.small"
            :alt="review.author"
          />
          <AvatarFallback>SH</AvatarFallback>
        </Avatar>
        <div>
          <h3 class="text-sm font-semibold leading-tight">{{ review.author }}</h3>
          <p class="text-xs text-custom-secondary sm:text-sm">{{ date }}</p>
        </div>
      </div>
      <div
        v-if="review.author_details?.rating"
        class="flex items-center gap-1 font-semibold text-custom-primary"
      >
        <IconStar stroke-width="1.5" :size="18" />
        <p class="text-sm sm:text-lg">{{ review.author_details?.rating }}/10</p>
      </div>
    </div>
    <div>
      <p class="mt-2.5 text-sm">
        <span>{{ truncatedContent }}</span>
        <a
          v-if="splitContent.length > 20 && review.url"
          :href="review.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-custom-accent hover:text-custom-accent/90"
        >
          Read More
        </a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Review } from '~/types/media'

const props = defineProps<{
  review: Review
}>()

const dayjs = useDayjs()

const date = computed(() => {
  return dayjs(props.review.created_at).format('MMM DD, YYYY')
})

const splitContent = computed(() => {
  return props.review.content.split(' ')
})

const truncatedContent = computed(() => {
  if (splitContent.value.length > 20) {
    return splitContent.value.slice(0, 20).join(' ') + '...'
  } else {
    return props.review.content
  }
})
</script>
