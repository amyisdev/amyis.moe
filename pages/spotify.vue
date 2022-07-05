<script setup lang="ts">
import SpotifyIcon from '~icons/simple-icons/spotify';

const { data: playingTrack, pending: isValidating, refresh } = useFetch('/api/spotify/now-playing');
const { data: topTracks } = useFetch('/api/spotify/top-tracks');

onMounted(() => refresh());
</script>

<template>
  <SmolContainer class="space-y-8">
    <CardContainer>
      <CardSection>
        <div class="flex items-center justify-between">
          <h1 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">My Spotify</h1>
          <SpotifyIcon class="text-[#1DB954] w-8 h-8" />
        </div>
      </CardSection>

      <CardSection v-if="isValidating" class="text-gray-700 dark:text-gray-400">
        <h2 class="text-sm font-medium">Currently playing</h2>
        <p>Loading....</p>
      </CardSection>

      <CardSection v-else-if="playingTrack && !playingTrack.isPlaying">
        <h2 class="text-sm font-medium text-gray-700 dark:text-gray-400">Currently not playing spotify</h2>
      </CardSection>

      <CardSection v-else-if="playingTrack && playingTrack.isPlaying">
        <SpotifyNowPlaying :track="playingTrack" />
      </CardSection>
    </CardContainer>

    <CardContainer>
      <CardSection>
        <h2 class="font-medium text-gray-900 dark:text-gray-100">Top Tracks</h2>
      </CardSection>

      <CardSection
        v-if="topTracks"
        class="space-y-2 divide-y divide-gray-200 dark:divide-gray-700 dark:divide-opacity-70"
      >
        <div v-for="(track, i) in topTracks.items" :key="i" class="flex" :class="i === 0 ? '' : 'pt-4'">
          <p class="mt-0.5 text-sm font-bold text-gray-500">{{ i + 1 }}</p>

          <div class="flex flex-col pl-3">
            <a
              :href="track.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-lg font-medium text-gray-900 dark:text-gray-100 hover:underline"
            >
              {{ track.name }}
            </a>

            <p class="text-gray-700 dark:text-gray-400">
              <span v-for="(artist, j) in track.artists" :key="j">
                <a :href="artist.external_urls" target="_blank" rel="noopener noreferrer" class="hover:underline">
                  {{ artist.name }}
                </a>

                <template v-if="track.artists.length > 1 && j !== track.artists.length - 1">
                  <span v-if="j === track.artists.length - 2"> & </span>
                  <span v-else>, </span>
                </template>
              </span>
            </p>
          </div>
        </div>
      </CardSection>
    </CardContainer>
  </SmolContainer>
</template>
