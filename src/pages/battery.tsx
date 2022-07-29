import { CardContainer, CardSection } from '@/components/Card'
import { SmolContainer } from '@/components/Layout'
import useBatteryMonitor from '@/utils/useBatteryMonitor'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

const BatteryDisplay = dynamic(() => import('@/components/client/BatteryDisplay'), {
  ssr: false,
  loading: () => <div className="h-28 sm:h-32" />,
})

const NotSupported = dynamic(() => import('@/components/client/NotSupported'), { ssr: false })

const Battery: NextPage = () => {
  const { battery } = useBatteryMonitor()

  return (
    <SmolContainer className="space-y-8">
      <CardContainer>
        <CardSection>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Battery Monitor</h1>

            {(!battery.isSupported || !battery.fetched) && <NotSupported />}
          </div>
        </CardSection>

        <CardSection>
          <BatteryDisplay battery={battery} className="mx-auto max-w-[280px] sm:max-w-xs" />
        </CardSection>
      </CardContainer>

      {/* TODO: Webhook */}
    </SmolContainer>
  )
}

export default Battery
