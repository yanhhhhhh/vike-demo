import { isTablet } from "@/utils";
import { useEffect, useState } from "react";

export default function PcNav() {
  function changeTabletFlag() {
    const [isTabletValue, setIsTabletValue] = useState(true);

    const isTableTemp = isTablet();

    setIsTabletValue(isTableTemp);
  }
  useEffect(() => {
    window.addEventListener("load", () => {
      // PC 端触发，ios ipad 不触发，默认isTabletValue = true ，hover 在ipad 上dropdown 会有问题
      changeTabletFlag();
    });

    window.addEventListener("orientationchange", changeTabletFlag);

    return () => {
      window.removeEventListener("load", changeTabletFlag);
      window.removeEventListener("orientationchange", changeTabletFlag);
    };
  }, []);
  return <>PcNav</>;
}
