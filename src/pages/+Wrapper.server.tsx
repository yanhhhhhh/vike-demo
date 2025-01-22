export { Wrapper };

import React from "react";
import { StyleProvider } from "@ant-design/cssinjs";
import { usePageContext } from "vike-react/usePageContext";

function Wrapper({ children }: { children: React.ReactNode }) {
  console.log("Wrapper.server.tsx");
  const pageContext = usePageContext();

  return <StyleProvider cache={pageContext.antdCache}>{children}</StyleProvider>;
}
