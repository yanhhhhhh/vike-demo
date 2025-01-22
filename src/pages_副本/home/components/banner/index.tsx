import { CardProps } from '@/components';
import { bannerList } from '@/constants';
import { baseConfig } from '@/stores';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import MyCarousel from '../carousel';

export const HomeBanner = () => {
  const { device } = useAtomValue(baseConfig);
  const bannerListProps = useMemo<CardProps[]>(() => {
    return bannerList.map((item) => {
      return {
        ...item,
        backgroundImage: device.isPc ? item.image : item.mobileImage,
        backgroundHeight: device.isPc ? '8rem' : '12.1rem',
        contentStyle: {
          marginTop: device.isPc ? '0.6rem' : '1.3rem',
        },
      };
    });
  }, [device]);
  return (
    <div className="home-banner">
      <MyCarousel list={bannerListProps} />
    </div>
  );
};
