<script setup lang="ts">
import { Switch } from '@headlessui/vue';
import AlertIcon from '~icons/mdi/alert-outline';

const { battery, state, logs, options, clearLogs } = useBatteryMonitor();
</script>

<template>
  <SmolContainer class="space-y-8">
    <ClientOnly>
      <CardContainer>
        <CardSection>
          <div class="flex items-center justify-between">
            <h1 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Battery Monitor</h1>

            <div
              v-if="!battery.isSupported"
              class="flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600"
            >
              <AlertIcon class="w-5 h-5 mr-2" />
              Not Supported
            </div>
          </div>
        </CardSection>

        <CardSection>
          <BatteryDisplay
            :is-supported="battery.isSupported"
            :charging="battery.charging.value"
            :level="battery.level.value"
            class="max-w-[280px] sm:max-w-xs mx-auto"
          />
        </CardSection>
      </CardContainer>

      <CardContainer v-if="battery.isSupported">
        <div class="px-4 py-4 sm:px-6">
          <div class="flex items-center justify-between">
            <h2 class="font-medium text-gray-900 dark:text-gray-100">Webhook</h2>

            <Switch
              v-model="state.enabled"
              :class="[
                state.enabled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700',
                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800',
              ]"
            >
              <span class="sr-only">enable/disable webhook</span>
              <span
                aria-hidden="true"
                class="inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full shadow pointer-events-none ring-0"
                :class="state.enabled ? 'translate-x-5' : 'translate-x-0'"
              ></span>
            </Switch>
          </div>
        </div>

        <CardSection v-if="state.enabled">
          <div>
            <label for="webook_url" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >Webhook URL</label
            >
            <div class="mt-1">
              <input
                id="webook_url"
                v-model="state.url"
                type="text"
                placeholder="https://example.test/api/webhook"
                class="block w-full border-gray-300 rounded-md shadow-sm dark:border-gray-600 dark:text-white dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
          </div>

          <div class="px-1 mt-2 text-xs font-medium dark:text-gray-100">
            Every {{ options.interval / 1000 }} seconds, this page will check whether your device needs to be charged or
            discharged. If it needs, a POST request will be sent to the webhook URL above.
          </div>
        </CardSection>

        <CardSection v-if="state.enabled">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-200">Webhook logs</h3>

            <button class="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" @click="clearLogs">
              Clear
            </button>
          </div>

          <div
            ref="logWindow"
            class="w-full h-64 px-3 py-2 mt-1 overflow-auto font-mono text-sm bg-gray-100 rounded-md dark:bg-gray-700 dark:text-gray-300 whitespace-nowrap"
          >
            <div v-if="logs.length === 0">No Activity</div>
            <div v-for="item in logs" :key="item.date">[{{ item.date }}] {{ item.text }}</div>
          </div>
        </CardSection>
      </CardContainer>
    </ClientOnly>
  </SmolContainer>
</template>
