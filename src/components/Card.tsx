import { ReactNode } from 'react'

type HasChildrenProps = {
  children: ReactNode
}

export const CardContainer = ({ children }: HasChildrenProps) => {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow dark:divide-gray-700 dark:bg-gray-800">
      {children}
    </div>
  )
}

export const CardSection = ({ children }: HasChildrenProps) => {
  return <div className="px-4 py-5 sm:px-6">{children}</div>
}
