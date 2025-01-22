import { other } from '@/constants';
import { useLocale, useWebsiteLinkTrack } from '@/hooks';
import { useCustomization } from '@/hooks/useCustomization';
import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import { Icon } from '..';
import LanguageSwitch from '../languageSwitch';
import { goCnMps, goCopyRight } from './tools';
import './view.less';

const MoFooter = () => {
  const { t } = useTranslation();
  const { thirdLinksAndOther } = useLocale();
  const { customServiceHotline, customEmail } = useCustomization();
  const { emailTrack, thirdLinksTrack, phoneTrack } = useWebsiteLinkTrack();
  return (
    <div className="footer">
      <div className="footer-container">
        <div>
          <Flex gap={10} className="language-switch" vertical>
            <LanguageSwitch position="footer" />
          </Flex>

          <div className="service-hot-line">
            <h3 className="title">{`${t(other.serviceHotLine)}`}</h3>
            <p
              className="hot-line"
              onClick={() => phoneTrack(customServiceHotline)}
            >
              {customServiceHotline}
            </p>
          </div>

          <div className="email">
            <Flex align="center">
              <div className="input">
                <Icon name="email" color="#fff" className="email-icon"></Icon>
                <a
                  onClick={() => emailTrack(customEmail)}
                  href={`mailto:${customEmail}`}
                >
                  {customEmail}
                </a>
              </div>
            </Flex>
          </div>
          <div className="hot-svgs">
            {thirdLinksAndOther.map((item, index) => (
              <img
                key={index}
                src={item.icon}
                alt={item.to}
                className="hot-icon"
                onClick={() => {
                  thirdLinksTrack(item);
                  window.open(item.to, '_blank');
                }}
              />
            ))}
          </div>
        </div>

        {/* 海辰官网 */}
        {/* <div>
          {`${t('contact.officialWebsite')}${t('sign.colon')} `}
          <a
            href={enterpriseInfo.officialWebsiteLong}
            target="_blank"
            className="color-primary"
          >
            {enterpriseInfo.officialWebsite}
          </a>
        </div> */}
        <div className="copyright-wrap">
          <p>版权所有©深圳海辰平权英雄能源科技有限公司</p>
          <p onClick={goCnMps}>粤公网安备44030002004256号</p>

          <p onClick={goCopyRight}>粤ICP备2024274286号-1</p>
        </div>
      </div>
    </div>
  );
};

export default MoFooter;
