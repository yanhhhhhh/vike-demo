export { LocaleText };

import React from "react";

import { translate } from "@/utils/locales/translate";
import { usePageContext } from "vike-react/usePageContext";

function LocaleText({ children }: { children: string }) {
  const pageContext = usePageContext();
  const { locale } = pageContext;
  const text = children;
  const textLocalized = translate(text, locale);
  return <>{textLocalized}</>;
}
