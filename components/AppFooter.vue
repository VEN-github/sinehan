<template>
  <footer class="self-end py-8">
    <BaseContainer>
      <div class="flex items-center justify-center gap-x-1 text-custom-foreground">
        <IconCopyright :size="18" />
        <p class="text-sm sm:text-lg">
          2024
          <NuxtLink to="/" class="font-medium tracking-tighter text-custom-primary sm:text-xl">
            sinehan.
          </NuxtLink>
          All rights reserved.
        </p>
      </div>
    </BaseContainer>
  </footer>
</template>
