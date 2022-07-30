import { $fetch } from 'ohmyfetch'
import { useBattery, useInterval, useLocalStorage } from 'react-use'

const runBatteryWebhook = async (battery: ReturnType<typeof useBattery>, webhookUrl: string) => {
  if (!battery.isSupported || !battery.fetched) {
    return 'Not supported'
  }

  const level = Math.round(battery.level * 100)
  const charging = battery.charging

  const levelString = `Battery level ${level}`
  const chargingString = charging ? 'charging' : 'not charging'

  if (level > 20 && level < 80) {
    return [levelString, 'between 20-80'].join(', ')
  }

  const conditionString = level <= 20 ? '<=20' : '>=80'
  if (level <= 20 && charging) {
    return [levelString, conditionString, chargingString].join(', ')
  }

  if (level >= 80 && !charging) {
    return [levelString, conditionString, chargingString].join(', ')
  }

  if (!webhookUrl) {
    return [levelString, conditionString, chargingString, 'no webhook'].join(', ')
  }

  const webhookString = [levelString, conditionString, chargingString, `webhook sent to ${webhookUrl}`].join(', ')

  try {
    await $fetch(webhookUrl, { method: 'POST' })
    return webhookString
  } catch (err) {
    return [webhookString, 'ERROR'].join(', ')
  }
}

type BatteryMonitorOptions = {
  interval?: number
  maxLogs?: number
}

const useBatteryMonitor = (options?: BatteryMonitorOptions) => {
  const interval = options?.interval || 60_000
  const maxLogs = options?.maxLogs || 100

  const battery = useBattery()

  const [state, setState] = useLocalStorage('batt-webhook', { enabled: true, url: '' })
  const [logs, setLogs, clearLogs] = useLocalStorage<Array<{ date: string; text: string }>>('batt-webhook-logs', [])

  const log = (text: string) => setLogs((vLogs) => vLogs?.concat({ date: new Date().toJSON(), text }))

  useInterval(
    async () => {
      const result = await runBatteryWebhook(battery, state?.url || '')
      log(result)

      if (logs?.length || 0 > maxLogs) {
        setLogs((vLogs) => vLogs?.slice(1))
      }
    },
    state?.enabled ? interval : null
  )

  return {
    battery,
    clearLogs,
    state,
    setState,
    logs,
    options: { interval, maxLogs },
  }
}

export default useBatteryMonitor
