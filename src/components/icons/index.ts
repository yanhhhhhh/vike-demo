import { clientOnly } from "vike-react/clientOnly";

const Icon = clientOnly(() => import("./view"));

// export { default as Icon } from "./view";
export default Icon;
// export * from "./view";
export * from "./type";
export * from "./icons";
