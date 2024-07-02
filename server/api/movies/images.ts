import useTMDBConfig from '~/composables/useTMDBConfig'
import { BACKDROP_URL } from '~/constants/image'

interface Response {
  backdrops: []
}

export default defineEventHandler(async (event) => {
  const config = useTMDBConfig()
  const query = getQuery(event)

  const response = await $fetch<Response>(`/movie/${query.id}/images`, config)

  const results = response.backdrops.map(({ file_path }: { file_path: string }) => {
    return {
      small: `${BACKDROP_URL.small}${file_path}`,
      original: `${BACKDROP_URL.original}${file_path}`
    }
  })

  return results
})
