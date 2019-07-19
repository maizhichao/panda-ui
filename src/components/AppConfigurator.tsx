/**
 * Global configuration for antd
 */
import React from "react";
import { LocaleProvider, ConfigProvider, Spin, Icon } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
Spin.setDefaultIndicator(<Icon type="loading" />);

declare global {
  // tslint:disable-next-line: interface-name
  interface Window {
    __WEBSERVER__: string;
  }
}

/**
 * Webpack dev server needs an unique identifier to
 * proxy the normal request to remote webserver.
 * In production mode, the value is reset to empty string
 */
window.__WEBSERVER__ =
  process.env.NODE_ENV === "production" ? "" : "__WEBSERVER__";

const AppConfigurator: React.FC = (props) => {
  return (
    <LocaleProvider locale={zhCN}>
      <ConfigProvider
        getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
      >
        {props.children}
      </ConfigProvider>
    </LocaleProvider>
  );
};

export default AppConfigurator;
