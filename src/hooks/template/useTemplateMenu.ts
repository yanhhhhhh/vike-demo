import { LabelObject } from '@/api/label';
import { templateBottomMenuListAtom, templateMenuListAtom } from '@/stores';
import {
  getPageMenu,
  storePageMenuList,
  storeTopMenuRouteMap,
} from '@/utils/page';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { useLocale } from '@/hooks';
import { IMenuItem, IMenusChildren } from './useTemplatNav';
// 递归填充route和routerCode 为topMenuRouteMap的route 用于路由跳转
function templateBottomWithRoute(
  templateBottomMenuList: LabelObject[],
  topMenuRouteMap: Map<string, IMenuItem | IMenusChildren>
): LabelObject[] {
  return templateBottomMenuList.map((item) => {
    const param = JSON.parse(item?.param ?? '{}');
    const relatedTopMenuId = param?.relatedTopMenuId ?? '';

    // If there's a relatedTopMenuId, attempt to find the corresponding top route
    if (relatedTopMenuId) {
      const topRoute = topMenuRouteMap.get(relatedTopMenuId);

      if (topRoute) {
        // Recursively process the childLabelDTOList if it exists
        const updatedChildren = item.childLabelDTOList
          ? templateBottomWithRoute(item.childLabelDTOList, topMenuRouteMap)
          : [];

        // Return the updated item with routerCode, router, and updated children
        return {
          ...item,
          routerCode: topRoute.routerCode,
          router: topRoute.path,
          path: topRoute.path,
          param: topRoute.param,
          childLabelDTOList: updatedChildren,
        };
      }
    }

    // If no relatedTopMenuId or no matching top route, return the item as is
    return {
      ...item,
      childLabelDTOList: item.childLabelDTOList
        ? templateBottomWithRoute(item.childLabelDTOList, topMenuRouteMap)
        : [],
      children: item.childLabelDTOList,
    };
  });
}

export const useTemplateMenu = () => {
  const templateMenuList = useAtomValue(templateMenuListAtom);
  const templateBottomMenuList = useAtomValue(templateBottomMenuListAtom);
  const { getI18nBackEndKey } = useLocale();
  const topMenu = useMemo(() => {
    const menu = storePageMenuList(templateMenuList);
    return getPageMenu(menu, getI18nBackEndKey);
  }, [getI18nBackEndKey, templateMenuList]);

  const topMenuRouteMap = useMemo(() => {
    const map = storeTopMenuRouteMap(topMenu, new Map());
    return map;
  }, [topMenu]);

  const bottomMenu = useMemo(() => {
    const newBottomMenu = templateBottomWithRoute(
      templateBottomMenuList,
      topMenuRouteMap
    );
    const menu = storePageMenuList(newBottomMenu);
    return getPageMenu(menu, getI18nBackEndKey);
  }, [getI18nBackEndKey, templateBottomMenuList, topMenuRouteMap]);

  return {
    templateMenuList,
    topMenu,
    bottomMenu,
  };
};
