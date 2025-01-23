import { addTokenInterceptor, authRequest } from "@/request";
import { PageContext } from "vike/types";
import { create } from "@/components/icons/icons";

// 在客户端渲染之前执行
export default (pageContext: PageContext) => {
  create();
  setToken(pageContext);
};
function setToken(pageContext: PageContext) {
  const token = localStorage.getItem("token");
  console.log("token", token);
  pageContext.token = token ?? "";
  addTokenInterceptor(authRequest.instance, token ?? "");
}
