import { newsBanner } from '@/constants';

import { Card, CardProps } from '@/components';
import { baseConfig } from '@/stores';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import './index.less';
import Case from './components/case';
const News = () => {
  const { device } = useAtomValue(baseConfig);

  const cardProps = useMemo<CardProps>(() => {
    return {
      ...newsBanner,
      descriptionInnerHtml: device.isPc ? false : true,
      description: device.isPc
        ? newsBanner.description
        : newsBanner.mobileDescription,
      backgroundHeight: '6rem',
      backgroundImage: device.isPc ? newsBanner.image : newsBanner.mobileImage,
      contentStyle: {
        marginTop: device.isPc ? '0.87rem' : '0.45rem',
        alignItems: device.isPc ? 'center' : 'center',
      },
      titleStyle: {
        fontWeight: 700,
      },
      descriptionStyle: {
        fontWeight: 400,
        fontSize: '0.28rem',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        marginTop: '0.15rem',
      },
      cardStyle: {
        justifyContent: 'center',
      },
      moreStyle: {
        display: 'none',
      },
    };
  }, [device]);

  return (
    <div className="news">
      <div id="hero-news-banner">
        <Card {...cardProps} />
      </div>

      <Case />
    </div>
  );
};

export default News;
