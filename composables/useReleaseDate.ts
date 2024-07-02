import type { Movie, TV } from '~/types/media'
import dayjs from '#build/dayjs.imports.mjs'

export default function useReleaseDate(media: Movie | TV) {
  if ('release_date' in media) {
    return dayjs(media.release_date).format('YYYY')
  }

  if ('first_air_date' in media) {
    return dayjs(media.first_air_date).format('YYYY')
  }

  return ''
}
