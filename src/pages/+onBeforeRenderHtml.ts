import { createCache } from "@ant-design/cssinjs";
import { extractLocale } from "@/utils/locales/extractLocale";
import type { PageContext } from "vike/types";
import { modifyUrl } from "vike/modifyUrl";

export default (pageContext: PageContext) => {
  pageContext.antdCache = createCache();
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
