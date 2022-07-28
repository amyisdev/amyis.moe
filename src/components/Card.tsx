import clsx from 'clsx'
import { HTMLProps, ReactNode } from 'react'

type Props = HTMLProps<HTMLDivElement> & {
  children: ReactNode
}

export const CardContainer = ({ className, children }: Props) => {
  return (
    <div
      className={clsx([
        'divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow dark:divide-gray-700 dark:bg-gray-800',
        className,
      ])}
    >
      {children}
    </div>
  )
}

export const CardSection = ({ className, children }: Props) => {
  return <div className={clsx(['px-4 py-5 sm:px-6', className])}>{children}</div>
}
