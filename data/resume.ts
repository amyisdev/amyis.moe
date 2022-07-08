import { marked } from 'marked';

import GithubIcon from '~icons/mdi/github';
import LinkedinIcon from '~icons/mdi/linkedin';
import TwitterIcon from '~icons/mdi/twitter';

export const name = 'Azmi Makarima Y';
export const title = 'DevOps Engineer';
export const bio = marked.parse(
  'More than 2 years of experience in software development. Currently enhancing my knowledge in devops while also working at **PT Telkom Indonesia Tbk**. Formerly worked as web developer, cloud administrator and system analyst.'
);

export const socials = [
  {
    icon: LinkedinIcon,
    href: 'https://linkedin.com/in/amyazmim',
    className: 'hover:text-[#0072b1] dark:hover:text-white dark:hover:opacity-90',
  },
  {
    icon: TwitterIcon,
    href: 'https://twitter.com/bfwithamy',
    className: 'hover:text-[#00acee] dark:hover:text-[#d6d9db]',
  },
  {
    icon: GithubIcon,
    href: 'https://github.com/amyisme13',
    className: 'hover:text-[#171515] dark:hover:text-[#f0f6fc]',
  },
];

export const skills = [
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
    items: ['Docker', 'Jenkins', 'Git', 'Vault', 'Postman'],
  },
  {
    title: 'Cloud Services',
    items: ['Amazon Web Services', 'Github', 'Gitlab', 'OneSignal'],
  },
];

export const workExperiences = [
  {
    company: 'PT Telkom Indonesia Tbk',
    positions: [
      {
        name: 'DevOps Engineer',
        duration: 'Jun 2022 - Present',
        description: ['Maintain Playcourt gitops.'],
      },
    ],
  },
  {
    company: 'PT Centrinova Solusi Edukasi',
    positions: [
      {
        name: 'System Analyst',
        duration: 'Jul 2021 - May 2022',
        description: [
          'Meet and coordinate with stakeholders to gather requirements.',
          'Analyze, design and document it into a software specification document for developers to follow.',
          'Create test scenarios for internal test and user acceptance test.',
          'Perform and monitor each task in the waterfall SDLC model.',
        ],
      },
      {
        name: 'Cloud Administrator',
        duration: 'Nov 2019 - May 2022',
        description: [
          'Maintain infrastructures in Amazon Web Services. This includes EC2, RDS, S3, SES, SNS and ALB.',
          'Configure server auto scaling to handle spike load in AWS EC2.',
          'Manage various 3rd party service accounts to be used by system developers.',
          'Deploy applications developed by system developers into AWS.',
        ],
      },
      {
        name: 'System Developer',
        duration: 'Sep 2019 - Oct 2021',
        description: [
          'Developed multiple web applications for clients using Laravel and Vue.js based on design documents created by analysts.',
          'Developed a learning management system on top of Moodle.',
        ],
      },
    ],
  },
];
