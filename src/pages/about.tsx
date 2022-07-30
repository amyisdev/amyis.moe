import meLight from '@/assets/me.jpg'
import meDark from '@/assets/me.png'
import { CardContainer, CardSection } from '@/components/Card'
import { SmolContainer } from '@/components/Layout'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { SiGithub, SiLinkedin, SiTwitter } from 'react-icons/si'

export const name = 'Azmi Makarima Y'
export const title = 'DevOps Engineer'
export const bio =
  'More than 2 years of experience in software development. Currently enhancing my knowledge in devops while also working at PT Telkom Indonesia Tbk. Formerly worked as web developer, cloud administrator and system analyst.'

export const socials = [
  {
    icon: SiLinkedin,
    href: 'https://linkedin.com/in/amyazmim',
    className: 'hover:text-[#0072b1] dark:hover:text-white dark:hover:opacity-90',
  },
  {
    icon: SiTwitter,
    href: 'https://twitter.com/bfwithamy',
    className: 'hover:text-[#00acee] dark:hover:text-[#d6d9db]',
  },
  {
    icon: SiGithub,
    href: 'https://github.com/amyisme13',
    className: 'hover:text-[#171515] dark:hover:text-[#f0f6fc]',
  },
]

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
]

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
]

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Me</title>
      </Head>

      <SmolContainer className="space-y-4">
        <CardContainer>
          <CardSection>
            <h1 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">About Me</h1>
          </CardSection>

          <CardSection>
            <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
              <div className="aspect-w-3 aspect-h-2 relative h-0 sm:aspect-w-2 sm:aspect-h-3">
                <Image
                  alt="Azmi Makarima"
                  layout="fill"
                  placeholder="blur"
                  src={meDark}
                  className="object-scale-down"
                />
              </div>

              <div className="sm:col-span-2">
                <div className="space-y-4">
                  <div className="space-y-1 text-lg font-medium leading-6">
                    <h3 className="dark:text-white">{name}</h3>
                    <p className="text-primary-600 dark:text-primary-500">{title}</p>
                    <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                      {socials.map((social) => (
                        <Link key={social.href} href={social.href}>
                          <a target="_blank" rel="noopener noreferrer" className={social.className}>
                            <social.icon className="mx-1 h-5 w-5" />
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="text-gray-500 dark:text-gray-400">{bio}</div>
                </div>
              </div>
            </div>
          </CardSection>
        </CardContainer>

        <CardContainer>
          <CardSection>
            <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Skills</h2>
          </CardSection>

          <CardSection className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.title} className="space-y-2">
                <h3 className="text-gray-900 dark:text-gray-100">{skill.title}</h3>
                <div className="flex items-center space-x-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </CardSection>
        </CardContainer>

        <CardContainer>
          <CardSection>
            <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Work Experience</h2>
          </CardSection>

          <CardSection className="space-y-8">
            {workExperiences.map((experience, i) => (
              <div key={i}>
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">{experience.company}</h3>

                {experience.positions.map((position, j) => (
                  <div key={j} className={j === 0 ? 'mt-2' : 'mt-4'}>
                    <div className="sm:flex sm:items-center sm:justify-between">
                      <h4 className="font-semibold text-gray-700 dark:text-gray-400">{position.name}</h4>
                      <div className="text-sm text-gray-500">{position.duration}</div>
                    </div>

                    <ul className="mt-1 ml-4 list-disc text-base text-gray-700 dark:text-gray-400">
                      {position.description.map((item, k) => (
                        <li key={k}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </CardSection>
        </CardContainer>
      </SmolContainer>
    </>
  )
}

export default About
