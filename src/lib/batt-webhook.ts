import { get, type useBattery } from '@vueuse/core';
import axios, { AxiosError } from 'axios';

export const runBatteryWebhook = async (battery: ReturnType<typeof useBattery>, webhookUrl: string) => {
  if (!battery.isSupported) {
    return 'Not supported';
  }

  const level = get(battery.level) * 100;
  const charging = get(battery.charging);

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
  try {
    await axios.post(webhookUrl);
    return webhookString;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status) {
      return [webhookString, `(${err.response.status})`].join(', ');
    } else {
      return [webhookString, '(Unknown Error)'].join(', ');
    }
  }
};
