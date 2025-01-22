import React from "react";
import { Counter } from "./Counter.js";
import { LocaleText } from "@/components/LocaleText.jsx";
import { Link } from "@/components/Link.jsx";
import { locales } from "@/utils/locales/locales.js";

export default function Page() {
  return (
    <>
      <h1 className={"font-bold text-3xl pb-4"}>My Vike app</h1>
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
