import { extractLocale } from "@/utils/locales/extractLocale";
import { modifyUrl } from "vike/modifyUrl";
import type { OnBeforeRouteSync } from "vike/types";
const onBeforeRoute: OnBeforeRouteSync = (pageContext): ReturnType<OnBeforeRouteSync> => {
  const url = pageContext.urlParsed;
  const { urlPathnameWithoutLocale, locale } = extractLocale(url.pathname);
  const urlLogical = modifyUrl(url.href, { pathname: urlPathnameWithoutLocale });

  return {
    pageContext: {
      // Make `locale` available as pageContext.locale
      locale,
      // Vike's router will use pageContext.urlLogical instead of pageContext.urlOriginal
      urlLogical,
    },
  };
};
export default onBeforeRoute;
