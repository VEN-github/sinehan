import { useLocalStorage } from '@vueuse/core'

export default function useMediaLayout() {
  const layout = useLocalStorage('media-layout', 'grid')

  return layout
}
