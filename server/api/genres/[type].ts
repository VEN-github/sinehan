import useTMDBConfig from '~/composables/useTMDBConfig'
import type { Genre } from '~/types/media'

export default defineEventHandler(async (event) => {
  const config = useTMDBConfig()
  const { type } = event.context.params as Record<string, string>

  const response = await $fetch<Genre[]>(`/genre/${type}/list?language=en-us`, config)

  return response
})
