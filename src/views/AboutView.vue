<script setup lang="ts">
import CardContainer from '@/components/Card/CardContainer.vue';
import CardSection from '@/components/Card/CardSection.vue';
import SkillBadge from '@/components/SkillBadge.vue';
import SmolContainer from '@/components/SmolContainer.vue';

import GithubIcon from '~icons/mdi/github';
import LinkedinIcon from '~icons/mdi/linkedin';
import TwitterIcon from '~icons/mdi/twitter';

const skills = [
  {
    title: 'Programming Languages',
    items: ['PHP', 'Javascript', 'Typescript', 'SQL'],
  },
  {
    title: 'Frameworks',
    items: ['Laravel', 'Vue.js', 'React', 'Express'],
  },
  {
    title: 'Databases',
    items: ['MongoDB', 'MySQL', 'PostgreSQL'],
  },
  {
    title: 'Tools',
    items: ['Docker', 'Jenkins', 'Git', 'Vault'],
  },
  {
    title: 'Cloud Services',
    items: ['Amazon Web Services', 'Github', 'Gitlab', 'OneSignal'],
  },
];
</script>

<template>
  <SmolContainer class="space-y-4">
    <CardContainer>
      <CardSection>
        <h1 class="text-lg font-medium leading-6 text-gray-900">About Me</h1>
      </CardSection>

      <CardSection>
        <div class="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
          <div class="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-2 sm:aspect-h-3">
            <img class="object-scale-down rounded-lg" src="/me.jpg" alt="" />
          </div>

          <div class="sm:col-span-2">
            <div class="space-y-4">
              <div class="space-y-1 text-lg font-medium leading-6">
                <h3>Azmi Makarima Y</h3>
                <p class="text-primary-600">Devops Engineer</p>
                <div class="flex items-center space-x-2">
                  <a href="https://linkedin.com/in/amyazmim" target="_blank" class="text-gray-500 hover:text-[#0072b1]">
                    <LinkedinIcon class="w-6 h-6" />
                  </a>
                  <a href="https://twitter.com/bfwithamy" target="_blank" class="text-gray-500 hover:text-[#00acee]">
                    <TwitterIcon class="w-6 h-6" />
                  </a>
                  <a href="https://github.com/amyisme13" target="_blank" class="text-gray-500 hover:text-[#171515]">
                    <GithubIcon class="w-6 h-6" />
                  </a>
                </div>
              </div>

              <div>
                <p class="text-gray-500">
                  More than 2 years of experience in software development. Currently enhancing my knowledge in devops
                  while also working at <span class="font-semibold">PT Telkom Indonesia Tbk</span>. Formerly worked as
                  web developer, cloud administrator and system analyst.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardSection>
    </CardContainer>

    <CardContainer>
      <CardSection>
        <h2 class="text-lg font-medium leading-6 text-gray-900">Skills</h2>
      </CardSection>

      <CardSection class="space-y-4">
        <div v-for="skill in skills" :key="skill.title" class="space-y-2">
          <h3>{{ skill.title }}</h3>
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
        <h2 class="text-lg font-medium leading-6 text-gray-900">Work Experience</h2>
      </CardSection>

      <CardSection>
        <h3 class="text-lg font-medium leading-6 text-gray-900">PT Telkom Indonesia Tbk</h3>

        <div class="mt-2 sm:flex sm:items-center sm:justify-between">
          <h4 class="font-medium text-gray-700">DevOps Engineer</h4>
          <div class="text-sm text-gray-500">Jun 2022 - Present</div>
        </div>

        <ul class="mt-1 ml-4 text-base text-gray-700 list-disc">
          <li>Maintain Playcourt gitops.</li>
        </ul>

        <h3 class="mt-8 text-lg font-medium leading-6 text-gray-900">PT Centrinova Solusi Edukasi</h3>

        <div class="mt-2 sm:flex sm:items-center sm:justify-between">
          <h4 class="font-medium text-gray-700">System Analyst</h4>
          <div class="text-sm text-gray-500">Jul 2021 - May 2022</div>
        </div>

        <ul class="mt-1 ml-4 text-base text-gray-700 list-disc">
          <li>Meet and coordinate with stakeholders to gather requirements.</li>
          <li>Analyze, design and document it into a software specification document for developers to follow.</li>
          <li>Create test scenarios for internal test and user acceptance test.</li>
          <li>Perform and monitor each task in the waterfall SDLC model.</li>
        </ul>

        <div class="mt-4 sm:flex sm:items-center sm:justify-between">
          <h4 class="font-medium text-gray-700">Cloud Administrator</h4>
          <div class="text-sm text-gray-500">Nov 2019 - May 2022</div>
        </div>

        <ul class="mt-1 ml-4 text-base text-gray-700 list-disc">
          <li>Maintain infrastructures in Amazon Web Services. This includes EC2, RDS, S3, SES, SNS and ALB.</li>
          <li>Configure server auto scaling to handle spike load in AWS EC2.</li>
          <li>Manage various 3rd party service accounts to be used by system developers.</li>
          <li>Deploy applications developed by system developers into AWS.</li>
        </ul>

        <div class="mt-4 sm:flex sm:items-center sm:justify-between">
          <h4 class="font-medium text-gray-700">System Developer</h4>
          <div class="text-sm text-gray-500">Sep 2019 - Oct 2021</div>
        </div>

        <ul class="mt-1 ml-4 text-base text-gray-700 list-disc">
          <li>
            Developed multiple web applications for clients using Laravel and Vue.js based on design documents created
            by analysts.
          </li>
          <li>Developed a learning management system on top of Moodle.</li>
        </ul>
      </CardSection>
    </CardContainer>
  </SmolContainer>
</template>
