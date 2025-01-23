import { HTMLAttributes } from "react";

import { IconName } from "./icons";
export enum IconSizeEnum {
  small = "small",
  middle = "middle",
  large = "large",
}
export const IconInnerSize = {
  [IconSizeEnum.small]: 12,
  [IconSizeEnum.middle]: 16,
  [IconSizeEnum.large]: 20,
};

export interface IconProps extends HTMLAttributes<SVGElement> {
  name: IconName;
  size?: keyof typeof IconSizeEnum | number;
}
