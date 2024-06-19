<template>
  <ul :class="[`flex ${navLinksClass}`]">
    <MenuLink v-for="link in links" :key="link.text" :link="link" />
  </ul>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: string
  }>(),
  {
    type: 'mobile'
  }
)

const links = ref([
  {
    text: 'Home',
    url: '/'
  },
  {
    text: 'Movies',
    url: '/movies'
  },
  {
    text: 'TV Shows',
    url: '/tv-shows'
  },
  {
    text: 'My List',
    url: '/my-list'
  }
])

const navLinksClass = computed<string>(() => {
  return props.type === 'mobile'
    ? 'flex-col space-y-6 h-screen px-8 py-28 landscape:justify-around'
    : 'items-center gap-x-8 xl:gap-x-14'
})
</script>
