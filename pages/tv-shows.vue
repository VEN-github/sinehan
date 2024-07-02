<template>
  <section>
    <ClientOnly fallback-tag="div">
      <div v-if="pending" class="grid h-svh place-items-center">
        <IconLoaderCircle class="animate-spin text-custom-primary" :size="64" />
      </div>
      <Media v-else :medias="tv?.results" />
      <div class="mb-8 mt-16 flex justify-center">
        <Pagination
          v-model:page="page"
          :total="500"
          show-edges
          :sibling-count="1"
          :default-page="1"
        >
          <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <PaginationFirst
              class="size-8 border-0 bg-primary hover:bg-custom-primary xs:size-10"
            />
            <PaginationPrev
              class="size-8 border-0 bg-primary hover:bg-custom-primary xs:size-10"
            />
            <template v-for="(item, index) in items">
              <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                <Button
                  class="size-8 p-0 hover:bg-custom-primary xs:size-10"
                  :class="{ 'bg-custom-primary': item.value === page }"
                >
                  {{ item.value }}
                </Button>
              </PaginationListItem>
              <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>
            <PaginationNext
              class="size-8 border-0 bg-primary hover:bg-custom-primary xs:size-10"
            />
            <PaginationLast
              class="size-8 border-0 bg-primary hover:bg-custom-primary xs:size-10"
            />
          </PaginationList>
        </Pagination>
      </div>
      <template #fallback>
        <div class="grid h-svh place-items-center">
          <IconLoaderCircle class="animate-spin text-custom-primary" :size="64" />
        </div>
      </template>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import type { APIResponse } from '~/types/api'
import type { TV } from '~/types/media'

const page = ref<number>(1)

watch(page, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

const { data: tv, pending } = await useAsyncData(
  'tv',
  () => $fetch<APIResponse<TV[]>>('/api/tv/discover', {
    params: {
      page: page.value
    }
  }), {
    watch: [page],
  }
)
</script>
