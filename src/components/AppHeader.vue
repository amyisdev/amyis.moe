<script setup lang="ts">
// import SearchIcon from '~icons/mdi/magnify';
import SmolContainer from './SmolContainer.vue';
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-10 shadow-sm bg-primary-800">
    <SmolContainer>
      <div class="relative flex items-center justify-between py-4 space-x-4">
        <p class="text-2xl font-bold leading-7 text-white">Amy's Lab</p>

        <!-- <div class="flex-1 min-w-0">
          <div class="flex items-center">
            <div class="w-full">
              <label for="search" class="sr-only">Search</label>

              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <SearchIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  class="block w-full py-2 pl-10 pr-3 text-sm placeholder-gray-400 bg-gray-700 border border-transparent rounded-md focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 focus:placeholder-gray-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </SmolContainer>
  </header>
</template>
