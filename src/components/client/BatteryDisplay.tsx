import { HTMLProps } from 'react'
import { MdBolt } from 'react-icons/md'
import type { useBattery } from 'react-use'
import { twMerge as clsx } from 'tailwind-merge'

type Props = {
  battery: ReturnType<typeof useBattery>
} & HTMLProps<HTMLDivElement>

const BatteryDisplay = ({ battery, className }: Props) => {
  const supported = battery.isSupported && battery.fetched

  const battPercentage = supported ? Math.round(battery.level * 100) : 0
  const battCharging = supported && battery.charging

  let battColor = 'bg-red-500'
  if (battPercentage > 10) {
    battColor = 'bg-yellow-500'
  } else if (battPercentage > 20) {
    battColor = 'bg-green-500'
  }

  return (
    <div className={clsx('flex items-center', className)}>
      <div className="h-28 flex-1 rounded-lg border-8 border-stone-700 bg-stone-700 sm:h-32">
        <div className="relative h-full w-full rounded-md bg-stone-600">
          <div style={{ width: `${battPercentage}%` }} className={`h-full rounded-md ${battColor}`}></div>

          <div className="absolute inset-0 flex items-center justify-center text-white">
            {battCharging && <MdBolt className="h-8 w-8" />}
            <p className="text-2xl font-semibold">{battPercentage}%</p>
          </div>
        </div>
      </div>

      <div className="h-7 w-6 rounded-r-lg bg-stone-700 sm:w-6"></div>
    </div>
  )
}

export default BatteryDisplay
