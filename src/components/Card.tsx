import { HTMLProps } from 'react'
import { twMerge as clsx } from 'tailwind-merge'

type Props = HTMLProps<HTMLDivElement>

export const CardContainer = ({ className, children }: Props) => {
  return (
    <div
      className={clsx(
        'divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow dark:divide-gray-700 dark:bg-gray-800',
        className
      )}
    >
      {children}
    </div>
  )
}

export const CardSection = ({ className, children }: Props) => {
  return <div className={clsx('px-4 py-5 sm:px-6', className)}>{children}</div>
}
