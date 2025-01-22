import solarPanelBannerImage from '@/assets/images/solarPanel/banner.png';
import solarPanelMobileBannerImage from '@/assets/images/solarPanel/banner-m.png';
import solarPanelMobileProductionImage01 from '@/assets/images/solarPanel/01-m.png';
import solarPanelMobileProductionImage02 from '@/assets/images/solarPanel/02-m.png';

export const solarPanelBanner = {
  key: 'banner',
  image: solarPanelBannerImage,
  title: 'solarPanelPage.bannerTitle',
  description: 'solarPanelPage.bannerDesc',
  mobileImage: solarPanelMobileBannerImage,
};

export const solarPanelProductions = [
  {
    title: 'solarPanelPage.solarPanelProductionTitle01',
    image: solarPanelMobileProductionImage01,

    //购买链接
    more: undefined,
  },
  {
    title: 'solarPanelPage.solarPanelProductionTitle02',
    image: solarPanelMobileProductionImage02,

    more: undefined,
  },
];