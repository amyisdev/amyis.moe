import type { FunctionalComponent } from 'vue';
import UserIcon from '~icons/mdi/account';
import JenkinsIcon from '~icons/simple-icons/jenkins';
import SonarqubeIcon from '~icons/simple-icons/sonarqube';
import BatteryIcon from '~icons/mdi/battery';

export type Service = {
  title: string;
  description: string;
  icon: FunctionalComponent;
  iconForeground: string;
  iconBackground: string;
  to: string;
};

export const services: Service[] = [
  {
    title: 'About Me',
    description: 'Wanna know who the creator of this site is? Click here and find out!.',
    to: '/about',
    icon: UserIcon,
    iconForeground: 'text-yellow-600 dark:text-yellow-100',
    iconBackground: 'bg-yellow-50 dark:bg-yellow-700',
  },
  {
    title: 'Battery Monitor',
    description:
      'Display the device battery level and charging information. Will also send webhook on certain conditions.',
    to: '/battery',
    icon: BatteryIcon,
    iconForeground: 'text-green-600 dark:text-green-100',
    iconBackground: 'bg-green-50 dark:bg-green-700',
  },
  {
    title: 'Jenkins',
    description: 'Learning jenkins locally is kinda hard, so i deploy it into the ☁️. (Currently inactive)',
    to: 'https://jenkins.amyis.moe',
    icon: JenkinsIcon,
    iconForeground: 'text-red-600 dark:text-red-100',
    iconBackground: 'bg-red-50 dark:bg-red-700',
  },
  {
    title: 'Sonarqube',
    description:
      'Used in jenkins pipeline to inspect the code quality and security of my projects. (Currently inactive)',
    to: 'https://sonarqube.amyis.moe',
    icon: SonarqubeIcon,
    iconForeground: 'text-cyan-600 dark:text-cyan-100',
    iconBackground: 'bg-cyan-50 dark:bg-cyan-700',
  },
];
