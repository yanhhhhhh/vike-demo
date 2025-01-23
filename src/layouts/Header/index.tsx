import { clientOnly } from "vike-react/clientOnly";

export const PcHeader = clientOnly(() => import("./pc").then((mod) => mod.default));

export const Header = PcHeader;
