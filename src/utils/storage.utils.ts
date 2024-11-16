import {MMKV} from 'react-native-mmkv';

export enum KEY {
  THEME = 'THEME',
}

const storage = new MMKV();

export const getData = (key: string) => storage.getString(key);

export const storeData = (
  key: string,
  value: boolean | string | number | ArrayBuffer,
) => storage.set(key, value);

export const removeData = (key: string) => storage.delete(key);

export const doesExist = (key: string) => storage.contains(key);

export default storage;
