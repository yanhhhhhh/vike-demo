import bannerImage from '/images/production/HeroEE1kWh/banner.webp';
import solarPanelImage from '@/assets/images/home/solarPanel.webp';
import partsImage from '@/assets/images/home/parts.webp';
import productionsImage from '@/assets/images/home/all-productions.webp';
import prowerSupplyImage from '@/assets/images/home/prowerSupply.webp';
import prowerSupplyImageEn from '@/assets/images/home/prowerSupply-en.webp';

import bannerMobileImage from '/images/production/HeroEE1kWh/banner-m.webp';
import solarPanelMobileImage from '@/assets/images/home/solarPanel-m.webp';
import partsMobileImage from '@/assets/images/home/parts-m.webp';
import productionsMobileImage from '@/assets/images/home/all-productions-m.webp';
import prowerSupplyMobileImage from '@/assets/images/home/prowerSupply-m.webp';
import prowerSupplyMobileImageEn from '@/assets/images/home/prowerSupply-m-en.webp';

import banner2Image from '/images/production/HeroEE2kWh/pc/banner.webp';
import banner2MobileImage from '/images/production/HeroEE2kWh/mobile/banner.webp';

import banner16Image from '/images/production/HeroEE16kWh/banner.webp';
import banner16MobileImage from '/images/production/HeroEE16kWh/banner-m.webp';
import banner8Image from '/images/production/HeroEE8kWh/banner.webp';
import banner8MobileImage from '/images/production/HeroEE8kWh/banner-m.webp';
//start V1.2
type CollectionKey = keyof typeof collections;
interface CollectionItem {
  title: string;
  description: string;
  key: string;
  image: string;
  more?: string;
  mobileImage: string;
}
export const collections = {
  //title:`homePage.${key}Title`,
  //description:`homePage.${key}Desc`,
  // more:"button.learnMoreInfo",
  banner: {
    // title:"homePage.bannerTitle",
    // description:"homePage.bannerDesc",
    key: 'banner',
    image: bannerImage,
    mobileImage: bannerMobileImage,
    more: '/product_intro/1kWh',
  },

  solarPanel: {
    key: 'solarPanel',
    image: solarPanelImage,
    mobileImage: solarPanelMobileImage,
    more: '/solarPanel',
  },
  parts: {
    key: 'parts',
    image: partsImage,
    mobileImage: partsMobileImage,
    more: '/parts',
  },
  productions: {
    key: 'productions',
    image: productionsImage,
    mobileImage: productionsMobileImage,
    more: undefined,
  },
};
export const bannerList = [
  {
    title: 'HeroEE1kWhPage.bannerTitle',
    description: 'HeroEE1kWhPage.bannerDesc',
    key: 'banner',
    image: bannerImage,

    mobileImage: bannerMobileImage,
    more: '/product_intro/1kWh',
  },
  {
    title: 'HeroEE2kWhPage.bannerTitle',
    description: 'HeroEE2kWhPage.bannerDesc',
    key: 'banner',
    image: banner2Image,

    mobileImage: banner2MobileImage,
    more: '/product_intro/2kWh',
  },
  {
    title: 'HeroEE8kWhPage.bannerTitle',
    description: 'HeroEE8kWhPage.bannerDesc',
    key: 'banner',
    image: banner8Image,

    mobileImage: banner8MobileImage,
    // more: '/product_intro/8kWh',
    more: '/templateRender/HeroEE8/', //V1.2 模版渲染
  },
  {
    title: 'HeroEE16kWhPage.bannerTitle',
    description: 'HeroEE16kWhPage.bannerDesc',
    key: 'banner',
    image: banner16Image,

    mobileImage: banner16MobileImage,
    // more: '/product_intro/16kWh',
    more: '/templateRender/HeroEE16/', //V1.2 模版渲染
  },
];
export const prowerSupply = {
  key: 'prowerSupply',
  title: `homePage.prowerSupplyTitle`,
  description: `homePage.prowerSupplyDesc`,
  zh: {
    image: prowerSupplyImage,
    mobileImage: prowerSupplyMobileImage,
  },
  en: {
    image: prowerSupplyImageEn,
    mobileImage: prowerSupplyMobileImageEn,
  },
  more: '/product_intro/1kWh',
};
export const homeCollections = Object.keys(collections).reduce((acc, key) => {
  const item = collections[key as CollectionKey];

  // 使用 `item.key` 为基础生成 title 和 describe 属性
  acc[key as CollectionKey] = {
    ...item, // 展开原有的 item 属性
    title: `homePage.${item.key}Title`,
    description: `homePage.${item.key}Desc`,
  };
  return acc;
}, {} as Record<CollectionKey, CollectionItem>);

//end V1.2
