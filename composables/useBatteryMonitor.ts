import { useStorage } from '@vueuse/core';
import type { Ref } from 'vue';

const runBatteryWebhook = async (battery: ReturnType<typeof useBattery>, webhookUrl: string) => {
  if (!battery.isSupported) {
    return 'Not supported';
  }

  const level = Math.round(battery.level.value * 100);
  const charging = battery.charging.value;

  const levelString = `Battery level ${level}`;
  const chargingString = charging ? 'charging' : 'not charging';

  if (level > 20 && level < 80) {
    return [levelString, 'between 20-80'].join(', ');
  }

  const conditionString = level <= 20 ? '<=20' : '>=80';
  if (level <= 20 && charging) {
    return [levelString, conditionString, chargingString].join(', ');
  }

  if (level >= 80 && !charging) {
    return [levelString, conditionString, chargingString].join(', ');
  }

  if (!webhookUrl) {
    return [levelString, conditionString, chargingString, 'no webhook'].join(', ');
  }

  const webhookString = [levelString, conditionString, chargingString, `webhook sent to ${webhookUrl}`].join(', ');

  const { error } = await useFetch(webhookUrl, { method: 'POST' });
  if (error.value) {
    return [webhookString, 'ERROR'].join(', ');
  }

  return webhookString;
};

interface BatteryMonitorOptions {
  interval?: number;
  maxLogs?: number;
  logWindow?: Ref<HTMLElement | undefined>;
}

const useBatteryMonitor = (options?: BatteryMonitorOptions) => {
  const interval = options?.interval || 60_000;
  const maxLogs = options?.maxLogs || 100;
  const logWindow = options?.logWindow;

  const battery = useBattery();

  const webhookState = useStorage('batt-webhook', { enabled: false, url: '' });
  const webhookLogs = useStorage<Array<{ date: string; text: string }>>('batt-webhook-logs', []);

  const log = (text: string) => webhookLogs.value.push({ date: new Date().toJSON(), text });
  const clearLogs = () => (webhookLogs.value = []);

  const { pause, resume } = useIntervalFn(async () => {
    const result = await runBatteryWebhook(battery, webhookState.value.url);
    log(result);

    if (webhookLogs.value.length > maxLogs) {
      webhookLogs.value.shift();
    }

    nextTick(() => {
      if (logWindow?.value) {
        logWindow.value.scrollTo({ top: logWindow.value.scrollHeight });
      }
    });
  }, interval);

  watch(webhookState.value, (state) => (state.enabled ? resume() : pause()));

  return {
    battery,
    clearLogs,
    state: webhookState,
    logs: webhookLogs,
    options: { interval, maxLogs },
  };
};

export default useBatteryMonitor;
