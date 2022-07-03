<script setup lang="ts">
import { name, title, bio, socials, skills, workExperiences } from '@/data/resume';
</script>

<template>
  <SmolContainer class="space-y-4">
    <CardContainer>
      <CardSection>
        <h1 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">About Me</h1>
      </CardSection>

      <CardSection>
        <div class="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
          <div class="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-2 sm:aspect-h-3">
            <img class="object-scale-down rounded-lg dark:hidden" src="/me.jpg" alt="Azmi Makarima" />
            <img class="hidden object-scale-down rounded-lg dark:block" src="/me.png" alt="Azmi Makarima" />
          </div>

          <div class="sm:col-span-2">
            <div class="space-y-4">
              <div class="space-y-1 text-lg font-medium leading-6">
                <h3 class="dark:text-white">{{ name }}</h3>
                <p class="text-primary-600 dark:text-primary-500">{{ title }}</p>
                <div class="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                  <a
                    v-for="social in socials"
                    :key="social.href"
                    :href="social.href"
                    target="_blank"
                    :class="social.className"
                  >
                    <component :is="social.icon" class="w-6 h-6" />
                  </a>
                </div>
              </div>

              <!-- eslint-disable-next-line vue/no-v-html -->
              <div class="text-gray-500 dark:text-gray-400" v-html="bio"></div>
            </div>
          </div>
        </div>
      </CardSection>
    </CardContainer>

    <CardContainer>
      <CardSection>
        <h2 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Skills</h2>
      </CardSection>

      <CardSection class="space-y-4">
        <div v-for="skill in skills" :key="skill.title" class="space-y-2">
          <h3 class="text-gray-900 dark:text-gray-100">{{ skill.title }}</h3>
          <div class="flex items-center space-x-2">
            <SkillBadge v-for="item in skill.items" :key="item">
              {{ item }}
            </SkillBadge>
          </div>
        </div>
      </CardSection>
    </CardContainer>

    <CardContainer>
      <CardSection>
        <h2 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Work Experience</h2>
      </CardSection>

      <CardSection class="space-y-8">
        <div v-for="(experience, i) in workExperiences" :key="i">
          <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">{{ experience.company }}</h3>

          <div v-for="(position, j) in experience.positions" :key="j" :class="[j === 0 ? 'mt-2' : 'mt-4']">
            <div class="sm:flex sm:items-center sm:justify-between">
              <h4 class="font-semibold text-gray-700 dark:text-gray-400">{{ position.name }}</h4>
              <div class="text-sm text-gray-500">{{ position.duration }}</div>
            </div>

            <ul class="mt-1 ml-4 text-base text-gray-700 list-disc dark:text-gray-400">
              <li v-for="(item, k) in position.description" :key="k">{{ item }}</li>
            </ul>
          </div>
        </div>
      </CardSection>
    </CardContainer>
  </SmolContainer>
</template>
