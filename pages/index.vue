<script setup lang="ts">
import OpenArrowIcon from '~icons/mdi/arrow-top-right';
import { services } from '@/data/services';
</script>

<template>
  <SmolContainer>
    <CardContainer>
      <div
        v-for="(service, i) in services"
        :key="service.title"
        :class="[
          i === 0 ? 'rounded-tl-lg rounded-tr-lg ' : '',
          i === services.length - 1 ? 'rounded-bl-lg rounded-br-lg' : '',
          'relative group  p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500',
        ]"
      >
        <div>
          <span class="inline-flex p-3 rounded-lg" :class="[service.iconBackground, service.iconForeground]">
            <component :is="service.icon" class="w-6 h-6" aria-hidden="true" />
          </span>
        </div>

        <div class="mt-6">
          <h3 class="text-lg font-medium text-gray-800 dark:text-gray-100">
            <NuxtLink :to="service.to" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true"></span>
              {{ service.title }}
            </NuxtLink>
          </h3>

          <p class="mt-2 text-sm text-gray-500">
            {{ service.description }}
          </p>
        </div>

        <span
          class="absolute text-gray-300 pointer-events-none top-6 right-6 group-hover:text-gray-400 dark:text-gray-500"
          aria-hidden="true"
        >
          <OpenArrowIcon class="w-8 h-8" />
        </span>
      </div>
    </CardContainer>
  </SmolContainer>
</template>
