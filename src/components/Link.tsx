import React from "react";

import { localeDefault } from "@/utils/locales/locales";
import { usePageContext } from "vike-react/usePageContext";

export function Link({ href, locale, ...props }: { href: string; locale?: string; children?: React.ReactNode }) {
  const urlPathnameWithoutLocale = href;
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;

  locale = locale || pageContext.locale;

  if (locale !== localeDefault) {
    href = "/" + locale + href;
  }

  const isActive =
    urlPathnameWithoutLocale === "/"
      ? urlPathnameWithoutLocale === urlPathname
      : urlPathname.startsWith(urlPathnameWithoutLocale);

  // 服务端和客户端生成一致的 className

  return <a href={href} className={isActive ? "text-blue-500" : ""} {...props} />;
}
