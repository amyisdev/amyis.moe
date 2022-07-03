<script setup lang="ts">
import LightningIcon from '~icons/mdi/lightning-bolt';

const props = defineProps({
  isSupported: Boolean,
  charging: Boolean,
  level: {
    type: Number,
    default: 0,
  },
});

const battLevel = computed(() => props.level || 0);

const battColor = computed(() => {
  if (!props.isSupported || battLevel.value <= 0.1) {
    return 'bg-red-500';
  }

  if (battLevel.value <= 0.2) {
    return 'bg-yellow-500';
  }

  return 'bg-green-500';
});

const battPercentage = computed(() => (!props.isSupported ? 0 : Math.round(battLevel.value * 100)));
</script>

<template>
  <div class="flex items-center">
    <div class="flex-1 border-8 rounded-lg h-28 sm:h-32 bg-stone-700 border-stone-700">
      <div class="relative w-full h-full rounded-md bg-stone-600">
        <div :style="{ width: `${battPercentage}%` }" class="h-full rounded-md" :class="battColor"></div>

        <div class="absolute inset-0 flex items-center justify-center text-white">
          <LightningIcon v-if="props.charging" class="w-8 h-8" />
          <p class="text-2xl font-semibold">{{ battPercentage }}%</p>
        </div>
      </div>
    </div>

    <div class="w-6 rounded-r-lg h-7 sm:w-6 bg-stone-700"></div>
  </div>
</template>
