import useTMDBConfig from '~/composables/useTMDBConfig'
import type { APIResponse } from '~/types/api'
import type { Video } from '~/types/media'

export default defineEventHandler(async (event) => {
  const config = useTMDBConfig()
  const { type, id } = event.context.params as Record<string, string>

  const response = await $fetch<APIResponse<Video[]>>(
    `/${type}/${id}/videos?language=en-US`,
    config
  )

  return response
})
