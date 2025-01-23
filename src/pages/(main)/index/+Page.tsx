import React from "react";
import { Counter } from "./Counter";
import { LocaleText } from "@/components/LocaleText";
import { Link } from "@/components/Link";
import { locales } from "@/utils/locales/locales";
import { useTranslation } from "@/hooks/useTranslation";

export default function Page() {
  const { t } = useTranslation();

  return (
    <>
      <h1 className={"font-bold text-3xl pb-4"}>{t("Hello")}</h1>
      This page is:
      <ul>
        <li>
          <LocaleText>Localized</LocaleText>. <LocaleText>Change language</LocaleText>:
          {locales.map((locale) => (
            <div style={{ marginLeft: 7 }} key={locale}>
              <Link locale={locale} href="/">
                {locale}
              </Link>
            </div>
          ))}
        </li>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
    </>
  );
}
