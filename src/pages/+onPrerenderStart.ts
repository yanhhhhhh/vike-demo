// https://vike.dev/onPrerenderStart

import { locales, localeDefault } from "@/utils/locales/locales";

import type { OnPrerenderStartAsync, PageContextServer } from "vike/types";

const onPrerenderStart: OnPrerenderStartAsync = async (prerenderContext): ReturnType<OnPrerenderStartAsync> => {
  console.log("onPrerenderStart", prerenderContext);
  const pageContexts: PageContextServer[] = [];
  prerenderContext.pageContexts.forEach((pageContext) => {
    // Duplicate pageContext for each locale
    locales.forEach((locale) => {
      // Localize URL
      let { urlOriginal } = pageContext;
      if (locale !== localeDefault) {
        urlOriginal = `/${locale}${pageContext.urlOriginal}`;
      }
      pageContexts.push({
        ...pageContext,
        urlOriginal,
        // Set pageContext.locale
        locale,
      });
    });
  });
  return {
    prerenderContext: {
      pageContexts,
    },
  };
};
// We only need this for pre-rendered apps https://vike.dev/pre-rendering
export default onPrerenderStart;
