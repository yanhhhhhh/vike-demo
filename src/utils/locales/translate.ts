export { translate };

import { translations } from "./translations";
import { localeDefault } from "./locales";

function translate(text: string, locale: string) {
  if (locale === localeDefault) {
    return text;
  }
  const textTranslations = translations[text as keyof typeof translations] as Record<string, string> | undefined;
  // if (!textTranslations) {
  //   throw new Error("No translation found for: `" + text + "`");
  // }
  return textTranslations?.[locale] ?? text;
}
