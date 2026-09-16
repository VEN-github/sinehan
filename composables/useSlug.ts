import type { Movie, TV } from '~/types/media'

export default function useSlug(media: Movie | TV) {
  if ('title' in media) {
    const slugTitle = slugify(media.title)

    return slugTitle ? `movie/${slugTitle}` : 'movie'
  }

  if ('name' in media) {
    const slugName = slugify(media.name)

    return slugName ? `tv-show/${slugName}` : 'tv-show'
  }

  return ''
}

function slugify(slug: string) {
  return slug
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '')
}
