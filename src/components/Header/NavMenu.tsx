import React from "react";
import { Menu, Icon } from "antd";
import { ClickParam } from "antd/lib/menu";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { INavigation } from "./models";

const NAV_LINKS: INavigation[] = [
  {
    link: "user",
    title: "用户管理",
    icon: <Icon type="team" />
  },
  {
    link: "role",
    title: "角色管理",
    icon: <Icon type="idcard" />
  },
  {
    link: "log",
    title: "日志管理",
    icon: <Icon type="file-search" />
  },
  {
    link: "other",
    title: "其他管理",
    icon: <Icon type="solution" />,
    subLinks: [
      {
        link: "pop",
        title: "千里眼",
        icon: <Icon type="table" />
      },
      {
        link: "jazz",
        title: "云能效",
        icon: <Icon type="cloud" />
      },
      {
        link: "hiphop",
        title: "机器顾问",
        icon: <Icon type="tool" />
      },
      {
        link: "funk",
        title: "变频顾问",
        icon: <Icon type="setting" />
      }
    ]
  }
];

const SUB_NAV_LINK_GROUP: { [key: string]: INavigation } = NAV_LINKS.reduce(
  (collection: { [key: string]: INavigation }, nav: INavigation) => {
    if (nav.subLinks) {
      nav.subLinks.forEach((sub) => {
        const key = [sub.link, nav.link].join(",");
        collection[key] = { ...sub };
      });
    }
    return collection;
  },
  {}
);

const makeTitle = (nav: INavigation, activeSubPath?: string) => {
  if (!activeSubPath) {
    return (
      <span className="main-title">
        {nav.icon}
        {nav.title}
      </span>
    );
  }
  return (
    <div className="navigation-title">
      <span className="main-title">
        {nav.icon}
        {nav.title}
      </span>
      <div className="sub-title">{activeSubPath}</div>
    </div>
  );
};

interface INavMenuProps {}

interface IProps extends RouteComponentProps<INavMenuProps> {}

interface INavMenuState {
  currentPathName: string;
  currentPath: string[];
  activeSubPath: string;
}

class NavMenu extends React.Component<IProps, INavMenuState> {
  state: INavMenuState = {
    currentPath: null,
    currentPathName: null,
    activeSubPath: null
  };

  public static getDerivedStateFromProps(
    nextProps: IProps,
    prevState: INavMenuState
  ) {
    const { pathname } = nextProps.location;
    if (pathname !== prevState.currentPathName) {
      if (pathname === "/") {
        nextProps.history.push("/user");
        return null;
      }
      const menuPath =
        pathname &&
        pathname
          .split("/")
          .slice(1, 3)
          .reverse();
      const menuPathName = String(menuPath);
      if (String(prevState.currentPath) !== menuPathName) {
        const activeSubNav = SUB_NAV_LINK_GROUP[menuPathName];
        const activeSubPath = activeSubNav && activeSubNav.title;
        return {
          currentPath: menuPath,
          currentPathName: pathname,
          activeSubPath: activeSubPath
        };
      }
    }
    return null;
  }

  private handleMenuItemClick = (e: ClickParam) => {
    if (String(this.state.currentPath) !== String(e.keyPath)) {
      this.props.history.push({
        pathname: "/" + e.keyPath.reverse().join("/")
      });
    }
  };

  getMenuItems = () => {
    return NAV_LINKS.map((nav: INavigation) => {
      if (nav.subLinks) {
        return (
          <Menu.SubMenu
            key={nav.link}
            title={makeTitle(nav, this.state.activeSubPath)}
          >
            {nav.subLinks.map((subNav) => {
              return (
                <Menu.Item key={subNav.link}>
                  {subNav.icon}
                  {subNav.title}
                </Menu.Item>
              );
            })}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={nav.link}>
          {nav.icon}
          {nav.title}
        </Menu.Item>
      );
    });
  };

  render() {
    return (
      <Menu
        className="menu-content"
        mode="horizontal"
        onClick={this.handleMenuItemClick}
        selectedKeys={this.state.currentPath}
      >
        {this.getMenuItems()}
      </Menu>
    );
  }
}

export default withRouter(NavMenu);
