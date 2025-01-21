import { createCache } from "@ant-design/cssinjs";
import type { PageContext } from "vike/types";

export default (pageContext: PageContext) => {
  pageContext.antdCache = createCache();
};
