import type { Movie, TV } from '~/types/media'

export default function useTitle(media: Movie | TV) {
  if ('title' in media) {
    return media.title
  }

  if ('name' in media) {
    return media.name
  }

  return ''
}
