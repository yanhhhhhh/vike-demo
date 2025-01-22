import { other } from '@/constants';
import { useLocale, useWebsiteLinkTrack } from '@/hooks';
import { useCustomization } from '@/hooks/useCustomization';
import { useTemplateMenu } from '@/hooks/template/useTemplateMenu';
import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import { Icon } from '..';
import LanguageSwitch from '../languageSwitch';
import { useTemplatNav } from '@/hooks/template/useTemplatNav';
import { goCnMps, goCopyRight } from './tools';
import './view.less';
import { getName } from '@/utils/page';

const TemplatePcFooter = () => {
  const { t } = useTranslation();
  const { customServiceHotline, customEmail } = useCustomization();
  const { thirdLinksAndOther, getI18nBackEndKey } = useLocale();
  const { bottomMenu } = useTemplateMenu();

  const { goTo } = useTemplatNav();
  const { emailTrack, thirdLinksTrack, phoneTrack } = useWebsiteLinkTrack();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="list">
          <div className="list-left">
            {bottomMenu.map((item) => (
              <div className="list-left-column" key={item.name}>
                <h3
                  className={`${
                    item.labelType == 'menu' ? 'title' : 'nav-title'
                  }`}
                  onClick={() => {
                    if (item.labelType !== 'menu') {
                      goTo(item);
                    }
                  }}
                >
                  {getName(item.i18nLabelNameJson, getI18nBackEndKey)}
                </h3>
                {item.children.map((child) => (
                  <p
                    className="list-item"
                    key={child.name}
                    onClick={() => goTo(child)}
                  >
                    {getName(child.i18nLabelNameJson, getI18nBackEndKey)}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div className="service-hot-line">
            <h3 className="title">{`${t(other.serviceHotLine)}`}</h3>
            <p
              className="hot-line"
              onClick={() => phoneTrack(customServiceHotline)}
            >
              {customServiceHotline}
            </p>
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
            <div className="email">
              <div className="input">
                <Icon name="email" color="#fff" className="email-icon"></Icon>
                <a
                  onClick={() => emailTrack(customEmail)}
                  href={`mailto:${customEmail}`}
                >
                  {customEmail}
                </a>
              </div>
            </div>
            {/* <Flex align="center">
              <input
                placeholder={`${t(other.emailPlaceholder)}`}
                className="input"
              />
              <div className="hot-email-wrap">
                <img src={other.email.icon} alt="" className="hot-email" />
              </div>
            </Flex>
            <Checkbox onChange={onChange} className="checkbox">
              {`${t(other.serviceTip)}`}
            </Checkbox> */}
          </div>
        </div>
        <div className="copyright-wrap">
          <Flex justify="space-between" align="center" className="copyright">
            {/* <span className="text">{t(enterpriseInfo.copyright)}</span>{' '} */}
            <p>
              <span
                style={{
                  marginRight: '0.4rem',
                }}
              >
                版权所有©深圳海辰平权英雄能源科技有限公司
              </span>
              <span className="text" onClick={goCnMps}>
                粤公网安备44030002004256号
              </span>
              <span className="text" onClick={goCopyRight}>
                粤ICP备2024274286号-1
              </span>
            </p>
            <LanguageSwitch position="footer" />
          </Flex>
        </div>
      </div>
    </footer>
  );
};

export default TemplatePcFooter;
