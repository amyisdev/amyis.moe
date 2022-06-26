<script setup lang="ts">
import BackIcon from '~icons/mdi/arrow-left';
import { useRoute } from 'vue-router';

import AppHeader from '@/components/AppHeader.vue';
import SmolContainer from '@/components/SmolContainer.vue';

const route = useRoute();
</script>

<template>
  <div class="bg-gray-100 min-h-screen pt-24 pb-8">
    <AppHeader />

    <SmolContainer v-if="route.path !== '/'" class="mb-4 -mt-2">
      <router-link to="/" class="text-base font-medium text-gray-500 hover:text-gray-700 flex items-center">
        <BackIcon class="flex-shrink-0 mr-1 h-5 w-5" />

        Back to home
      </router-link>
    </SmolContainer>

    <router-view />
  </div>
</template>
