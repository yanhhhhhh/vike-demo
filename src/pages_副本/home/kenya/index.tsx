import { useAtomValue } from 'jotai';
import ContactView from '../components/contactView';
import ImageView from '../components/imageView';
import MapView from './component/mapView';
import { imageViewList } from '@/constants/kenya';
import { baseConfig } from '@/stores';
import VideoView from './component/videoView';
import { kenyaContact } from '@/constants/kenya';
import contactImage from '@/assets/images/kenyaHome/10.png';
import contactMobileImage from '@/assets/images/kenyaHome/mobile/10.png';
export function KenyaHome() {
  const { device } = useAtomValue(baseConfig);
  return (
    <div>
      <MapView />
      {imageViewList.map((item, index) => {
        return (
          <ImageView
            key={index}
            backgroundImage={device.isPc ? item.image : item.mobileImage}
            height={device.isPc ? undefined : item.mobileImageHeight}
          />
        );
      })}
      <VideoView />
      <ContactView
        contactList={kenyaContact}
        backgroundImage={contactImage}
        mobileBackgroundImage={contactMobileImage}
      />
    </div>
  );
}
export default KenyaHome;
