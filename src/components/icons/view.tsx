import { isNumber } from "lodash-es";
import { FC } from "react";

import { create } from "./icons";
import { IconInnerSize, IconProps } from "./type";

let loaded = false;
(function () {
  if (!loaded) {
    window.addEventListener("DOMContentLoaded", () => {
      console.log("DOMContentLoaded");
      create();
    });
    loaded = true;
  }
})();
const Icon: FC<IconProps> = ({ name, size = "large", ...rest }) => {
  const svgSize = isNumber(size) ? size : IconInnerSize[size];

  return (
    <svg width={svgSize} height={svgSize} {...rest}>
      <use fill="currentColor" href={`#icon-${name}`} xlinkHref={`#icon-${name}`} />
    </svg>
  );
};

export default Icon;
