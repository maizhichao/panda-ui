import React from "react";
import { Layout, Avatar } from "antd";
import "./style.less";
import NavMenu from "./NavMenu";

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
        <Avatar className="menu-option" icon="user" />
      </Header>
    );
  }
}

export default AppHeader;
