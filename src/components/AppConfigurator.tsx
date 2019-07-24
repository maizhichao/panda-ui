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
    WEBSERVER: string;
  }
}

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
