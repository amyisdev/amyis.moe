import { ArrowLeftIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { HTMLProps, ReactNode } from 'react'

type Props = HTMLProps<HTMLDivElement> & {
  children: ReactNode
}

export const SmolContainer = ({ children, className }: Props) => {
  return <div className={clsx(['mx-auto max-w-3xl px-4 sm:px-6 lg:px-8', className])}>{children}</div>
}

const ThemeToggler = dynamic(() => import('./client/ThemeToggler'), { ssr: false })

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-10 bg-primary-800 shadow-sm dark:bg-primary-900">
      <SmolContainer>
        <div className="relative flex items-center justify-between space-x-4 py-4">
          <p className="text-2xl font-bold leading-7 text-white">Amy&apos;s Lab</p>

          <ThemeToggler />
        </div>
      </SmolContainer>
    </header>
  )
}

export const Layout = ({ children, className }: Props) => {
  const router = useRouter()

  return (
    <div className={clsx(['min-h-screen bg-gray-100 pt-24 pb-8 dark:bg-gray-900', className])}>
      <Header />

      <SmolContainer className="mb-4 -mt-2">
        {router.pathname !== '/' && (
          <Link href="/">
            <a className="flex items-center text-base font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <ArrowLeftIcon className="mr-1 h-5 w-5 flex-shrink-0" />
              Back to home
            </a>
          </Link>
        )}
      </SmolContainer>

      {children}
    </div>
  )
}
