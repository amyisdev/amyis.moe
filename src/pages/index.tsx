import { CardContainer } from '@/components/Card'
import { SmolContainer } from '@/components/layouts/Default'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { SVGProps } from 'react'
import { FaPollH } from 'react-icons/fa'
import { HiUser } from 'react-icons/hi'
import { MdBatteryStd } from 'react-icons/md'
import { SiSpotify } from 'react-icons/si'
import { twMerge as clsx } from 'tailwind-merge'

const services = [
  {
    title: 'About Me',
    description: 'Wanna know who the creator of this site is? Click here and find out!.',
    href: '/about',
    icon: HiUser,
    iconForeground: 'text-yellow-600 dark:text-yellow-100',
    iconBackground: 'bg-yellow-50 dark:bg-yellow-700',
  },
  {
    title: 'My Spotify',
    description: "See what's currently playing on my spotify and what my top tracks are.",
    href: '/spotify',
    icon: SiSpotify,
    iconForeground: 'text-green-600 dark:text-green-100',
    iconBackground: 'bg-green-50 dark:bg-green-700',
  },
  {
    title: 'Battery Monitor',
    description: 'Display the device battery level and charging information.',
    href: '/battery',
    icon: MdBatteryStd,
    iconForeground: 'text-emerald-600 dark:text-emerald-100',
    iconBackground: 'bg-emerald-50 dark:bg-emerald-700',
  },
  {
    title: 'Polling',
    description: 'Create polls or participate in one!',
    href: '/polling',
    icon: FaPollH,
    iconForeground: 'text-blue-600 dark:text-blue-100',
    iconBackground: 'bg-blue-50 dark:bg-blue-700',
  },
]

const OpenArrowIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="currentColor" d="M5 17.59L15.59 7H9V5h10v10h-2V8.41L6.41 19L5 17.59Z"></path>
    </svg>
  )
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Amy&apos;s Lab</title>
      </Head>

      <SmolContainer>
        <CardContainer>
          {services.map((service, i) => (
            <div
              key={service.title}
              className={clsx(
                i === 0 ? 'rounded-tl-lg rounded-tr-lg ' : '',
                i === services.length - 1 ? 'rounded-bl-lg rounded-br-lg' : '',
                'group relative  p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500'
              )}
            >
              <div>
                <span className={clsx('inline-flex rounded-lg p-3', service.iconBackground, service.iconForeground)}>
                  <service.icon className="h-6 w-6" aria-hidden="true" />
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                  <Link href={service.href} className="focus:outline-none">
                    <a>
                      <span className="absolute inset-0" aria-hidden="true"></span>
                      {service.title}
                    </a>
                  </Link>
                </h3>

                <p className="mt-2 text-sm text-gray-500">{service.description}</p>
              </div>

              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400 dark:text-gray-500"
                aria-hidden="true"
              >
                <OpenArrowIcon className="h-8 w-8" />
              </span>
            </div>
          ))}
        </CardContainer>
      </SmolContainer>
    </>
  )
}

export default Home
