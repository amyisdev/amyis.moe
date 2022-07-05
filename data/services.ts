import type { FunctionalComponent } from 'vue';
import UserIcon from '~icons/mdi/account';
import JenkinsIcon from '~icons/simple-icons/jenkins';
import SpotifyIcon from '~icons/simple-icons/spotify';
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
    title: 'My Spotify',
    description: "See what's currently playing on my spotify and what my top tracks are.",
    to: '/spotify',
    icon: SpotifyIcon,
    iconForeground: 'text-green-600 dark:text-green-100',
    iconBackground: 'bg-green-50 dark:bg-green-700',
  },
  {
    title: 'Battery Monitor',
    description:
      'Display the device battery level and charging information. Will also send webhook on certain conditions.',
    to: '/battery',
    icon: BatteryIcon,
    iconForeground: 'text-emerald-600 dark:text-emerald-100',
    iconBackground: 'bg-emerald-50 dark:bg-emerald-700',
  },
  {
    title: 'Jenkins',
    description: 'Learning jenkins locally is kinda hard, so i deploy it into the ☁️. (Currently inactive)',
    to: 'https://jenkins.amyis.moe',
    icon: JenkinsIcon,
    iconForeground: 'text-red-600 dark:text-red-100',
    iconBackground: 'bg-red-50 dark:bg-red-700',
  },
];
