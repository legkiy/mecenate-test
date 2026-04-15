import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const STORAGE_KEY = 'app_instance_id';

let cachedUuid: string | null = null;

export async function getOrCreateAppUuid(): Promise<string> {
  if (cachedUuid) {
    return cachedUuid;
  }

  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      cachedUuid = stored;
      return stored;
    }
  } catch {}

  const newUuid = Crypto.randomUUID();
  try {
    await AsyncStorage.setItem(STORAGE_KEY, newUuid);
  } catch {}
  cachedUuid = newUuid;
  return newUuid;
}

export function getAppUuid(): string | null {
  return cachedUuid;
}
