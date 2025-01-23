import { translate } from "@/utils/locales/translate";
import { usePageContext } from "vike-react/usePageContext";

export function useTranslation() {
  const { locale } = usePageContext();

  function t(key: string): string {
    return translate(key, locale);
  }
  return {
    t,
  };
}
