import { getTemplateGroupGroupByCountry } from "@/api/template";
import { allCountry, EastAsia, regionCountry } from "@/constants";
import { useSearchParams } from "@/hooks/useSearchParams";
import { regionListAtom } from "@/stores";
import { filterRegionsAndCountriesByTemplateGroupIds, mapTemplateGroupIdsToRegions } from "@/utils/template";
import { useSetAtom } from "jotai";
import { useCallback } from "react";
import { usePageContext } from "vike-react/usePageContext";

export function useInitCountryAndTemplateId() {
  // const setTemplateId = useSetAtom(templateId);
  const initialLang = "zh_CN";
  const [search] = useSearchParams();
  const setRegionList = useSetAtom(regionListAtom);
  const currentCountry = allCountry.filter((item) => item.locale === initialLang)[0] || EastAsia[0];
  const { locale } = usePageContext();
  const previewPageId = search.get("preview");
  const initCountryAndTemplateId = useCallback(() => {
    getTemplateGroupGroupByCountry().then(async (res) => {
      const { data } = res;
      console.log({ data });
      const { code, data: templateGroup } = data;
      if (code == 200) {
        const t = mapTemplateGroupIdsToRegions(templateGroup, regionCountry);

        const templateGroupIds = search.get("templateGroupIds");
        const templateGroupIdsArr = templateGroupIds?.split(",") ?? [];
        // 预览初始化国家列表
        if (previewPageId) {
          const regions = filterRegionsAndCountriesByTemplateGroupIds(t, templateGroupIdsArr);
          setRegionList(regions);
          // switchLocale(regions);
          const country = regions[0].countries[0];
          const path = location.pathname.replace(`/${locale ?? ""}`, "/" + country.locale);
          // navigate(path);

          return;
        }

        setRegionList(t);
        // switchLocale(t);
      }
    });
  }, []);
  return {
    initCountryAndTemplateId,
  };
}
