import React from "react";
import { Layout } from "antd";
import "./style.less";
import NavMenu from "./NavMenu";
import MenuOptions from "./MenuOptions";

const { Header } = Layout;

interface IAppHeaderProps {}

interface IAppHeaderState {}

class AppHeader extends React.Component<IAppHeaderProps, IAppHeaderState> {
  state = {};

  public static getDerivedStateFromProps(
    nextProps: IAppHeaderProps,
    prevState: IAppHeaderState
  ) {
    return {};
  }

  render() {
    return (
      <Header className="se-app-header">
        <div className="menu-logo" />
        <NavMenu />
        <MenuOptions />
      </Header>
    );
  }
}

export default AppHeader;
