import { localeDefault } from "@/utils/locales/locales";
import { Typography } from "antd";
import React from "react";
import { usePageContext } from "vike-react/usePageContext";

// export function Link({ href, locale, children }: { href: string; locale?: string; children: string }) {
//   const pageContext = usePageContext();
//   const { urlPathname } = pageContext;
//   locale = locale || pageContext.locale;
//   console.log("locale", locale);
//   if (locale! == localeDefault) {
//     href = `/${locale}${href}`;
//   }
//   const isActive = href === "/" ? urlPathname === href : urlPathname.startsWith(href);
//   return (
//     <Typography.Link href={href} className={isActive ? "is-active" : undefined}>
//       {children}
//     </Typography.Link>
//   );
// }
export function Link({ href, locale, ...props }) {
  const pageContext = usePageContext();
  locale = locale || pageContext.locale;
  if (locale !== localeDefault) {
    href = "/" + locale + href;
  }
  return <a href={href} {...props} />;
}
