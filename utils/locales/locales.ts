export const locales = ["en-US", "de-DE", "fr-FR"] as const;
export const localeDefault = locales[0];

// 通过 TypeScript 类型推导，TLocale 会自动成为联合类型
export type TLocale = (typeof locales)[number];
// 获取 locales数组里面的类型
