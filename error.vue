<template>
  <section class="grid h-screen place-items-center">
    <BaseContainer>
      <div class="flex flex-shrink-0 justify-center">
        <AppLogo />
      </div>
      <div class="text-center xs:py-16">
        <p class="font-semibold text-custom-primary">{{ error?.statusCode || 404 }}</p>
        <h1 class="mt-2 text-2xl font-bold tracking-tight xs:text-4xl sm:text-5xl">
          {{ error?.statusMessage || 'Page Not Found' }}
        </h1>
        <p class="text-custom-foreground-secondary mt-2">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div class="mt-6">
          <button
            type="button"
            class="font-medium text-custom-secondary transition-colors hover:text-custom-secondary/70"
            @click="handleError"
          >
            Go back home <span aria-hidden="true"> &rarr;</span>
          </button>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError
})

function handleError() {
  clearError({ redirect: '/' })
}
</script>
