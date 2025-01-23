export { Wrapper };

import React, { Suspense } from "react";
import { StyleProvider } from "@ant-design/cssinjs";
import { usePageContext } from "vike-react/usePageContext";
import { App, Spin } from "antd";
import { AntdStaticMethodProvider } from "@/providers";

function Wrapper({ children }: { children: React.ReactNode }) {
  console.log("Wrapper.server.tsx");
  const pageContext = usePageContext();

  return (
    <StyleProvider cache={pageContext.antdCache}>
      <App>
        <AntdStaticMethodProvider>{children}</AntdStaticMethodProvider>
      </App>
      {/* {children} */}
    </StyleProvider>
  );
}
