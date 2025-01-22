import type Entity from "@ant-design/cssinjs/lib/Cache";
// 类型声明
declare global {
  namespace Vike {
    interface PageContext {
      antdCache?: Entity;
      locale: string;
      urlLogical: string;
    }
  }
}

export {};
