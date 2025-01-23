import "./index.less";
import "./layout.css";

import React, { useEffect } from "react";

import { useAgreement } from "@/hooks/useAgreement";
import { Header } from "@/layouts/Header";
import { useInitCountryAndTemplateId } from "./useInitCountryAndBindTemplateId";
// import { ClientOnlyPcNav } from "@/components/HeroNavigator/pc";

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  const { getAgreementList } = useAgreement();
  const { initCountryAndTemplateId } = useInitCountryAndTemplateId();
  useEffect(() => {
    // init
    console.log("layout default");
    initCountryAndTemplateId();
    getAgreementList();
  }, []);
  return (
    <div id="app" className="app">
      <Header />

      <Content>{children}</Content>
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container">
      <div id="page-content">{children}</div>
    </div>
  );
}
