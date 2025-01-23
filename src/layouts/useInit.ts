import { allCountry, EastAsia, RegionCountry } from "@/constants";
import { message } from "@/providers";
import { templateId } from "@/stores";
import { useSetAtom } from "jotai";
import { useCallback } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { getExampleTypeDict } from "@/api/case";
import { exampleTypeAtom } from "@/stores/case";
import { useTemplateRender } from "@/hooks/template/useTemplateRender";

export function useGlobalInit() {
  const initialLang = "zh_CN";
  const { locale } = usePageContext();
  const setTemplateId = useSetAtom(templateId);
  const { getTemplateLabelPromise, getTemplateBottomLabelPromise } = useTemplateRender();
  const setExampleType = useSetAtom(exampleTypeAtom);

  const currentCountry = allCountry.filter((item) => item.locale === initialLang)[0] || EastAsia[0];
  const initMenu = useCallback(
    async (element: RegionCountry, finallyCallback?: () => void) => {
      if (!element.templateGroupId) {
        message.error("templateGroupId is not exist");
      } else {
        setTemplateId(element.templateGroupId);
      }
      const templateLabelPromise = getTemplateLabelPromise(element);
      const PromiseList = [
        templateLabelPromise,
        getTemplateBottomLabelPromise(element), // 获取底部菜单
        getExampleTypeDict().then((res) => {
          const { code, data } = res.data;

          if (code == 200) {
            setExampleType(data);
          }
        }),
      ];
      // setGlobalLoading(true);
      await Promise.all(PromiseList)
        .then(() => {})
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          finallyCallback && finallyCallback();
        });
    },
    [setExampleType, setTemplateId],
  );

  return {
    initMenu,
  };
}
