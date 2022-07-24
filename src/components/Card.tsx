import { ReactNode } from 'react'

type HasChildrenProps = {
  children: ReactNode
}

export const CardContainer = ({ children }: HasChildrenProps) => {
  return (
    <div className="overflow-hidden bg-white divide-y divide-gray-200 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700">
      {children}
    </div>
  )
}

export const CardSection = ({ children }: HasChildrenProps) => {
  return <div className="px-4 py-5 sm:px-6">{children}</div>
}
