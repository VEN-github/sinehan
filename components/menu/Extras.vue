<template>
  <div class="flex items-center gap-x-2 md:gap-x-4">
    <button type="button" class="flex items-center gap-x-2" @click="open = true">
      <IconSearch :size="20" stroke-width="1.5" />
      <p class="hidden md:block">
        Search
        <kbd
          class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100"
        >
          <span class="text-xs">CTRL</span>K
        </kbd>
      </p>
    </button>
    <Separator orientation="vertical" class="hidden !h-5 lg:block" />
    <ClientOnly fallback-tag="span" fallback="Loading...">
      <BaseAvatar />
    </ClientOnly>
    <MenuButton @toggle-menu="emit('toggleMenu')" />
    <CommandDialog v-model:open="open">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
      </CommandList>
    </CommandDialog>
  </div>
</template>

<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'

const emit = defineEmits(['toggleMenu'])

const open = ref<boolean>(false)

const { Meta_K, Ctrl_K } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey))
      e.preventDefault()
  },
})

watch([Meta_K, Ctrl_K], (v) => {
  if (v[0] || v[1])
    handleOpenChange()
})

function handleOpenChange() {
  open.value = !open.value
}
</script>
