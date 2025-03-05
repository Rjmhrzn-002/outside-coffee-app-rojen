import {MMKV} from 'react-native-mmkv';

export const mmkvStorage = new MMKV();

export const storage = {
  set: (key: string, value: any) => mmkvStorage.set(key, JSON.stringify(value)),
  get: <T>(key: string): T | null => {
    const value = mmkvStorage.getString(key);
    return value ? JSON.parse(value) : null;
  },
  remove: (key: string) => mmkvStorage.delete(key),
};
