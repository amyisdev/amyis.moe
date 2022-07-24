import { ArrowLeftIcon } from '@heroicons/react/solid'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

type HasChildrenProps = {
  children: ReactNode
}

export const SmolContainer = ({ children }: HasChildrenProps) => {
  return <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8">{children}</div>
}

const ThemeToggler = dynamic(() => import('./ThemeToggler'), { ssr: false })

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-10 shadow-sm bg-primary-800 dark:bg-primary-900">
      <SmolContainer>
        <div className="relative flex items-center justify-between py-4 space-x-4">
          <p className="text-2xl font-bold leading-7 text-white">Amy&apos;s Lab</p>

          <ThemeToggler />
        </div>
      </SmolContainer>
    </header>
  )
}

export const Layout = ({ children }: HasChildrenProps) => {
  const router = useRouter()

  return (
    <div className="min-h-screen pt-24 pb-8 bg-gray-100 dark:bg-gray-900">
      <Header />

      <SmolContainer>
        {router.pathname !== '/' && (
          <button className="flex items-center text-base font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <ArrowLeftIcon className="flex-shrink-0 w-5 h-5 mr-1" />
            Back to home
          </button>
        )}
      </SmolContainer>

      {children}
    </div>
  )
}
