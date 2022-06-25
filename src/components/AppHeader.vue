<script setup lang="ts">
import SearchIcon from '~icons/mdi/magnify';
import SmolContainer from './SmolContainer.vue';
</script>

<template>
  <header class="bg-gray-800 shadow-sm fixed inset-x-0 top-0 z-10">
    <SmolContainer>
      <div class="py-4 relative flex justify-between items-center space-x-4">
        <p class="text-2xl font-bold leading-7 text-white">Amy's Lab</p>

        <div class="min-w-0 flex-1">
          <div class="flex items-center">
            <div class="w-full">
              <label for="search" class="sr-only">Search</label>

              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <SearchIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  class="block w-full bg-gray-700 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 focus:placeholder-gray-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SmolContainer>
  </header>
</template>
