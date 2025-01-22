import { allCountry, EastAsia } from '@/constants';
// 基础存储
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { storeKeys } from './constants';

import { RegionCountry } from '@/constants';
import type { Device } from '@/utils';

enum ELang {
  chinese = 'zh_CN',
  english = 'en_US',
}
export type Lang = ELang.chinese | ELang.english | string;
interface IBaseConfig extends RegionCountry {
  isLandscapeFlag?: boolean;
  language: Lang;
  device: Device;
  isFullscreenFlag: boolean;
  theme: 'dark' | 'blue';
}
const base = JSON.parse(localStorage.getItem('baseConfig') ?? '{}');

const language = base?.locale ?? localStorage.getItem('i18nextLng') ?? 'zh_CN';

const initialBaseStore: IBaseConfig = {
  language,
  device: {
    isMobile: true,
    isTablet: false,
    isPc: false,
  },
  isFullscreenFlag: false,
  theme: 'dark',
  ...(allCountry.filter((item) => item.locale === language)[0] || EastAsia[0]),
};

const storage = createJSONStorage<IBaseConfig>(() => localStorage);
const baseConfig = atomWithStorage<IBaseConfig>(
  storeKeys.baseConfig,
  initialBaseStore,
  storage
);

export { baseConfig, ELang };
