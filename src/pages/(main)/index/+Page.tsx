import React from "react";
import { Counter } from "./Counter";
import { LocaleText } from "@/components/LocaleText";
import { Link } from "@/components/Link";
import { locales } from "@/utils/locales/locales";
import { useTranslation } from "@/hooks/useTranslation";
import { CounterNumber } from "./CounterNumber";
import Icon from "@/components/icons/";

export default function Page() {
  const { t } = useTranslation();

  return (
    <>
      <h1 className={"font-bold text-3xl pb-4"}>{t("header.product")}</h1>
      This page is:
      <ul>
        <li>
          <LocaleText>partsPage.partsSeries</LocaleText>. :
          {locales.map((locale) => (
            <div style={{ marginLeft: 7 }} key={locale}>
              <Link locale={locale} href="/">
                {locale}
              </Link>
            </div>
          ))}
        </li>
        <li>Rendered to HTML.</li>
        <Icon
          name="back-top"
          style={{
            color: "red",
          }}
        ></Icon>
        <div></div>

        <li>
          Interactive.
          <Counter />
          <CounterNumber />
        </li>
      </ul>
    </>
  );
}
