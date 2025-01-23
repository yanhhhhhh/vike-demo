import { memo, Suspense, useEffect, useState } from "react";

// import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

import { useAtom, useSetAtom } from "jotai";

import { baseConfig, regionListAtom } from "@/stores";

import { getDevice, getUALangugeStr, isContainToolBar } from "@/utils";

import HeroNav from "@/components/navigator";

import { BackToTop, Footer, ScrollToTop } from "@/components";
import i18n from "@/utils/language/i18nConfig";

import "./App.less";
import { EastAsia } from "./constants";
import "./tailwind.css";

import { Spin } from "antd";
import { getTemplateGroupGroupByCountry } from "./api/template";
import { Region, regionCountry } from "./constants";

import { useLocale, usePageViewTracking } from "./hooks";
import { useAgreement } from "./hooks/useAgreement";
import { message } from "./providers";
import { globalLoadingAtom } from "./stores/global";
import {
  filterRegionsAndCountriesByTemplateGroupIds,
  getAllCountry,
  mapTemplateGroupIdsToRegions,
} from "./utils/template";

import { PreviewBar } from "./components/previewBar";
import { useMemoizedFn } from "ahooks";
import { usePageContext } from "vike-react/usePageContext";

function App() {
  const { locale } = usePageContext();
  const [search] = useSearchParams();
  const setBase = useSetAtom(baseConfig);

  const location = useLocation();
  const navigate = useNavigate();
  const { initLanguageFetch } = useLocale();

  const [globalLoading, setGlobalLoading] = useAtom(globalLoadingAtom);
  const { getAgreementList } = useAgreement();
  const setRegionList = useSetAtom(regionListAtom);
  const [isInitialized, setIsInitialized] = useState(false);
  const previewPageId = search.get("preview");

  const switchLocale = async (region: Region[]) => {
    const baseConfig = JSON.parse(localStorage.getItem("baseConfig") ?? "{}");
    const initialLang = !previewPageId
      ? locale || baseConfig?.locale || getUALangugeStr()
      : region[0].countries[0].locale;
    const allCountry = getAllCountry(region);

    const currentCountry = allCountry.filter((item) => item.locale === initialLang)[0] || EastAsia[0];

    const device = getDevice();
    const obj = isContainToolBar();
    i18n.changeLanguage(currentCountry.i18n);
    setBase((prev) => ({
      ...prev,
      device,
      isFullscreenFlag: !obj.flag,
      language: currentCountry.i18n,
      ...currentCountry,
    }));

    try {
      await initLanguageFetch(currentCountry);
    } catch (error) {
      message.error("Failed to fetch language data");
    }

    if ((!locale || locale !== currentCountry.locale) && !previewPageId) {
      let path = location.pathname.replace(`/${locale ?? ""}`, "/" + currentCountry.locale);
      path = search ? `${path}?${search.toString()}` : path;

      navigate(path);
    }
  };

  const setDevice = useMemoizedFn(() => {
    const device = getDevice();
    const obj = isContainToolBar();
    setBase((pre) => ({
      ...pre,
      device,
      isFullscreenFlag: !obj.flag,
    }));
  });

  useEffect(() => {
    setGlobalLoading(true);
    getTemplateGroupGroupByCountry().then(async (res) => {
      const { data } = res;

      const { code, data: templateGroup } = data;
      if (code == 200) {
        const t = mapTemplateGroupIdsToRegions(templateGroup, regionCountry);

        const templateGroupIds = search.get("templateGroupIds");
        const templateGroupIdsArr = templateGroupIds?.split(",") ?? [];
        if (previewPageId) {
          const regions = filterRegionsAndCountriesByTemplateGroupIds(t, templateGroupIdsArr);
          setRegionList(regions);
          switchLocale(regions);
          const country = regions[0].countries[0];
          const path = location.pathname.replace(`/${locale ?? ""}`, "/" + country.locale);
          navigate(path);
          setGlobalLoading(false);
          return;
        }

        setRegionList(t);
        switchLocale(t);
      }
    });

    setIsInitialized(true);
    getAgreementList();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", setDevice);

    return () => {
      window.removeEventListener("resize", setDevice);
    };
  }, []);

  // 启动页面查看埋点跟踪
  usePageViewTracking(isInitialized);

  if (!isInitialized) {
    return <Spin fullscreen={true} />;
  }
  return (
    <div className="app">
      <div>
        <ScrollToTop />

        <div className="dark">
          <HeroNav />
          {/* fallback值的是在还没有成功加载路由组件时，会先执行fallback的内容，然后当加载完毕之后才会渲染路由子组件 */}
          <Suspense fallback={<Spin fullscreen={true} />}>
            {/* {globalLoading && previewPageId ? (
              <Spin fullscreen={true} />
            ) : (
              <Outlet />
            )} */}
            <Outlet />
          </Suspense>

          <Footer />
          <BackToTop />
          {search.get("preview") && <PreviewBar pageId={search.get("preview") as string} />}
        </div>
      </div>
    </div>
  );
}

export default memo(App);
