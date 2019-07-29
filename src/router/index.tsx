import React from "react";
import { createBrowserHistory } from "history";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import NotFound from "common/components/NotFound";
import { Skeleton, Spin } from "antd";

export const history = createBrowserHistory();

const Loading = () => <Spin delay={100} tip="加载中" />;

const EmptySkeleton = () => {
  return <Skeleton active={true} avatar={true} />;
};

const UserManagement = Loadable({
  loader: () => import("components/UserManagement"),
  loading: Loading
});

const RoleManagement = Loadable({
  loader: () => import("components/RoleManagement"),
  loading: Loading
});

class Router extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Switch>
        <Route path="/user" component={UserManagement} />
        <Route path="/role" component={RoleManagement} />
        <Route path="/log" component={EmptySkeleton} />
        <Route path="/other/pop" component={EmptySkeleton} />
        <Route path="/other/jazz" component={EmptySkeleton} />
        <Route path="/other/hiphop" component={EmptySkeleton} />
        <Route path="/other/funk" component={EmptySkeleton} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Router;
