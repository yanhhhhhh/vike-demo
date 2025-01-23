export { translate };

// import { localeDefault } from "./locales";
import zhCNJson from "@/assets/locales/zh_CN.json";
import enUSJson from "@/assets/locales/en_US.json";
const translations = {
  zh_CN: zhCNJson,
  en_US: enUSJson,
};

function translate(localeKey: string, locale: string): string {
  // 检查 locale 是否在 translations 中
  if (!(locale in translations)) {
    console.warn(`Locale '${locale}' not found in translations.`);
    return `[Missing locale: ${locale}]`;
  }

  // 按 '.' 分割 localeKey
  const keys = localeKey.split(".");

  // 获取当前 locale 的翻译内容
  let translation: Record<string, any> = translations[locale as keyof typeof translations];

  // 遍历 keys，逐层查找翻译
  for (const key of keys) {
    if (translation[key] === undefined) {
      console.warn(`Translation for '${localeKey}' not found in locale '${locale}'.`);
      return `[Missing translation: ${localeKey}]`;
    }
    translation = translation[key];
  }

  // 如果最终的 translation 不是字符串，返回错误提示
  if (typeof translation !== "string") {
    console.warn(`Translation for '${localeKey}' in locale '${locale}' is not a string.`);
    return `[Invalid translation: ${localeKey}]`;
  }

  return translation;
}
