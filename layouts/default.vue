<script setup lang="ts">
import BackIcon from '~icons/mdi/arrow-left';

const route = useRoute();
</script>

<template>
  <div class="min-h-screen pt-24 pb-8 bg-gray-100 dark:bg-gray-900">
    <AppHeader />

    <SmolContainer v-if="route.path !== '/'" class="mb-4 -mt-2">
      <NuxtLink
        to="/"
        class="flex items-center text-base font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
      >
        <BackIcon class="flex-shrink-0 w-5 h-5 mr-1" />

        Back to home
      </NuxtLink>
    </SmolContainer>

    <slot></slot>
  </div>
</template>
