<script setup lang="ts">
import UserIcon from '~icons/mdi/account';
import OpenArrowIcon from '~icons/mdi/arrow-top-right';
import JenkinsIcon from '~icons/simple-icons/jenkins';
import SonarqubeIcon from '~icons/simple-icons/sonarqube';
import BatteryIcon from '~icons/mdi/battery';
import type { FunctionalComponent } from 'vue';

import SmolContainer from '@/components/SmolContainer.vue';

type Service = {
  title: string;
  description: string;
  icon: FunctionalComponent;
  iconForeground: string;
  iconBackground: string;
  href?: string;
  to?: string;
};

const services: Service[] = [
  {
    title: 'About Me',
    description: 'Wanna know who the creator of this site is? Click here and find out!.',
    to: '/about',
    icon: UserIcon,
    iconForeground: 'text-yellow-600',
    iconBackground: 'bg-yellow-50',
  },
  {
    title: 'Battery Monitor',
    description:
      'Display the device battery level and charging information. Will also send webhook on certain conditions.',
    to: '/battery',
    icon: BatteryIcon,
    iconForeground: 'text-green-600',
    iconBackground: 'bg-green-50',
  },
  {
    title: 'Jenkins',
    description: 'Learning jenkins locally is kinda hard, so i deploy it into the ☁️. (Currently inactive)',
    href: 'https://jenkins.amyis.moe',
    icon: JenkinsIcon,
    iconForeground: 'text-red-600',
    iconBackground: 'bg-red-50',
  },
  {
    title: 'Sonarqube',
    description:
      'Used in jenkins pipeline to inspect the code quality and security of my projects. (Currently inactive)',
    href: 'https://sonarqube.amyis.moe',
    icon: SonarqubeIcon,
    iconForeground: 'text-cyan-600',
    iconBackground: 'bg-cyan-50',
  },
];
</script>

<template>
  <SmolContainer>
    <div class="overflow-hidden bg-gray-200 divide-y divide-gray-200 rounded-lg shadow">
      <div
        v-for="(service, i) in services"
        :key="service.title"
        :class="[
          i === 0 ? 'rounded-tl-lg rounded-tr-lg ' : '',
          i === services.length - 1 ? 'rounded-bl-lg rounded-br-lg' : '',
          'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500',
        ]"
      >
        <div>
          <span
            :class="[service.iconBackground, service.iconForeground, 'rounded-lg inline-flex p-3 ring-4 ring-white']"
          >
            <component :is="service.icon" class="w-6 h-6" aria-hidden="true" />
          </span>
        </div>

        <div class="mt-6">
          <h3 class="text-lg font-medium">
            <a v-if="service.href" :href="service.href" target="_blank" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true"></span>
              {{ service.title }}
            </a>

            <router-link v-else-if="service.to" :to="service.to" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true"></span>
              {{ service.title }}
            </router-link>
          </h3>

          <p class="mt-2 text-sm text-gray-500">
            {{ service.description }}
          </p>
        </div>

        <span
          class="absolute text-gray-300 pointer-events-none top-6 right-6 group-hover:text-gray-400"
          aria-hidden="true"
        >
          <OpenArrowIcon class="w-8 h-8" />
        </span>
      </div>
    </div>
  </SmolContainer>
</template>
