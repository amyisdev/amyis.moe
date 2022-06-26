<script setup lang="ts">
import { Switch } from '@headlessui/vue';
import AlertIcon from '~icons/mdi/alert-outline';
import { useBattery, useIntervalFn, useStorage } from '@vueuse/core';
import { watch } from 'vue';

import SmolContainer from '@/components/SmolContainer.vue';
import BatteryDisplay from '@/components/BatteryDisplay.vue';
import { runBatteryWebhook } from '@/lib/batt-webhook';

const INTERVAL = 30_000;

const battery = useBattery();

const webhookState = useStorage('batt-webhook', { enabled: false, url: '' });
const webhookLogs = useStorage<Array<{ date: string; text: string }>>('batt-webhook-logs', []);

const log = (text: string) => webhookLogs.value.push({ date: new Date().toJSON(), text });
const clearLogs = () => (webhookLogs.value = []);

const { pause, resume } = useIntervalFn(async () => {
  const result = await runBatteryWebhook(battery, webhookState.value.url);
  log(result);
}, INTERVAL);

watch(webhookState.value, (state) => (state.enabled ? resume() : pause()));
</script>

<template>
  <SmolContainer class="space-y-8">
    <div class="overflow-hidden bg-white divide-y divide-gray-200 rounded-lg shadow">
      <div class="px-4 py-5 sm:px-6">
        <div class="flex items-center justify-between">
          <h1 class="text-lg font-medium leading-6 text-gray-900">Battery Monitor</h1>

          <div
            v-if="!battery.isSupported"
            class="flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600"
          >
            <AlertIcon class="w-5 h-5 mr-2" />
            Not Supported
          </div>
        </div>
      </div>

      <div class="px-4 py-5 sm:p-6">
        <BatteryDisplay
          :is-supported="battery.isSupported"
          :charging="battery.charging.value"
          :level="battery.level.value"
          class="max-w-[280px] sm:max-w-xs mx-auto"
        />
      </div>
    </div>

    <div v-if="battery.isSupported" class="overflow-hidden bg-white divide-y divide-gray-200 rounded-lg shadow">
      <div class="px-4 py-4 sm:px-6">
        <div class="flex items-center justify-between">
          <h2 class="font-medium text-gray-900">Webhook</h2>

          <Switch
            v-model="webhookState.enabled"
            :class="[
              webhookState.enabled ? 'bg-indigo-600' : 'bg-gray-200',
              'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
            ]"
          >
            <span class="sr-only">enable/disable webhook</span>
            <span
              aria-hidden="true"
              class="inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full shadow pointer-events-none ring-0"
              :class="webhookState.enabled ? 'translate-x-5' : 'translate-x-0'"
            ></span>
          </Switch>
        </div>
      </div>

      <div v-if="webhookState.enabled" class="px-4 py-5 sm:px-6">
        <div>
          <label for="webook_url" class="block text-sm font-medium text-gray-700">Webhook URL</label>
          <div class="mt-1">
            <input
              id="webook_url"
              type="text"
              placeholder="https://example.test/api/webhook"
              v-model="webhookState.url"
              class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div class="px-1 mt-2 text-xs font-medium">
          Every 30 seconds, this page will check whether your device needs to be charged or discharged. If it needs, a
          POST request will be sent to the webhook URL above.
        </div>
      </div>

      <div v-if="webhookState.enabled" class="px-4 py-5 sm:px-6">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-medium text-gray-700">Webhook logs</h3>

          <button class="text-sm text-gray-500 hover:text-gray-700" @click="clearLogs">Clear</button>
        </div>

        <div
          class="w-full h-64 px-3 py-2 mt-1 overflow-auto font-mono text-sm bg-gray-100 rounded-md whitespace-nowrap"
        >
          <div v-if="webhookLogs.length === 0">No Activity</div>
          <div v-for="(log, i) in webhookLogs" :key="i">[{{ log.date }}] {{ log.text }}</div>
        </div>
      </div>
    </div>
  </SmolContainer>
</template>
