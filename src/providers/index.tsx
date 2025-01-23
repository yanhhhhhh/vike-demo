import { App } from "antd";

import { FC, PropsWithChildren } from "react";

import type { MessageInstance } from "antd/es/message/interface";
import type { ModalStaticFunctions } from "antd/es/modal/confirm";
import type { NotificationInstance } from "antd/es/notification/interface";

// 添加前缀类，用于自定义静态方法的颜色

export interface AntdStaticMethodProps extends PropsWithChildren {}

let message: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, "warn">;

export const AntdStaticMethodProvider: FC<AntdStaticMethodProps> = (props) => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;
  return <>{props.children}</>;
};

export { message, modal, notification };
