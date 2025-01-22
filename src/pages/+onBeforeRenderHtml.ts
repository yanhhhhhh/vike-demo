import { createCache } from "@ant-design/cssinjs";

import type { PageContext } from "vike/types";

export default (pageContext: PageContext) => {
  // console.log("onBeforeRenderHtml", pageContext);
  pageContext.antdCache = createCache();
};
