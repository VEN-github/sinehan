import useTMDBConfig from '~/composables/useTMDBConfig'
import type { APIResponse } from '~/types/api'
import type { Video } from '~/types/media'

export default defineEventHandler(async (event) => {
  const config = useTMDBConfig()
  const slug = event.context.params?.slug

  const response = await $fetch<APIResponse<Video[]>>(`/${slug}/videos?language=en-US`, config)

  return response
})
