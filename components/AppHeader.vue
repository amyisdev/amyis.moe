<script setup lang="ts">
import MoonIcon from '~icons/mdi/weather-night';
import SunIcon from '~icons/mdi/weather-sunny';

const colorMode = useColorMode();
const toggleColor = () => (colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark');
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-10 shadow-sm bg-primary-800 dark:bg-primary-900">
    <SmolContainer>
      <div class="relative flex items-center justify-between py-4 space-x-4">
        <p class="text-2xl font-bold leading-7 text-white">Amy's Lab</p>

        <button class="rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600" @click="toggleColor()">
          <SunIcon v-if="colorMode.value === 'dark'" class="w-6 h-6 text-white" />
          <MoonIcon v-else class="w-6 h-6 text-white" />
        </button>
      </div>
    </SmolContainer>
  </header>
</template>
