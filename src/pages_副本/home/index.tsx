import { useAtomValue } from 'jotai';
import HomeView from './homeView';
import KenyaHome from './kenya';
import NigeriaHome from './nigeria';
import { useLocale } from '@/hooks';
import { globalLoadingAtom } from '@/stores/global';

const Home = () => {
  const { locale } = useLocale();
  // const globalLoading = useAtomValue(globalLoadingAtom);
  // if (globalLoading) {
  //   return null;
  // }
  switch (locale) {
    case 'en_KE':
      return <KenyaHome />;
    case 'en_NG':
      return <NigeriaHome />;

    default:
      return <HomeView />;
  }
};

export default Home;
