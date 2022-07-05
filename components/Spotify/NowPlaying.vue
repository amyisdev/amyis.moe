<script setup lang="ts">
import { PropType } from 'vue';
import type { NowPlayingResponse } from '~~/types/spotify';

const props = defineProps({
  track: {
    type: Object as PropType<NowPlayingResponse>,
    required: true,
  },
});

const artistsLength = computed(() => (props.track ? props.track.artists.length : 0));
</script>

<template>
  <div>
    <h2 class="text-sm font-medium text-gray-700 dark:text-gray-400">Currently playing</h2>

    <div class="flex flex-col mt-2 sm:items-start sm:flex-row">
      <img
        v-if="track.smallImage"
        :src="track.smallImage"
        :alt="`${track.name} album art`"
        class="hidden w-24 h-24 rounded-md sm:block"
      />

      <img
        v-if="track.bigImage"
        :src="track.bigImage"
        :alt="`${track.name} album art`"
        class="mx-auto w-full h-auto max-w-[280px] rounded-xl sm:hidden"
      />

      <div class="space-y-0.5 ml-0 sm:ml-4 mt-2 sm:mt-0">
        <p class="text-xl font-medium leading-7 text-gray-900 dark:text-gray-100 line-clamp-1">
          <a :href="track.url" target="_blank" rel="noopener noreferrer" class="hover:underline">{{ track.name }}</a>
        </p>

        <p class="text-gray-700 dark:text-gray-400">
          by
          <span v-for="(artist, i) in track.artists" :key="i">
            <a :href="artist.external_urls" target="_blank" rel="noopener noreferrer" class="hover:underline">
              {{ artist.name }}
            </a>

            <template v-if="artistsLength > 1 && i !== artistsLength - 1">
              <span v-if="i === artistsLength - 2"> & </span>
              <span v-else>, </span>
            </template>
          </span>
        </p>

        <p class="text-gray-700 dark:text-gray-400">
          from
          <a :href="track.fromUrl" target="_blank" rel="noopener noreferrer" class="hover:underline">
            <span v-if="track.from === 'artist'">the artist page</span>
            <span v-else>a {{ track.from }}</span>
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
