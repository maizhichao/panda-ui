import React from "react";
import { connect } from "react-redux";
import { removeUser, editUser } from "store/actions/user-management";
import { showSpin } from "store/actions/main";
import { IUser } from "common/models/user-management";
import { history } from "router";
import { AppState } from "store/configure-store";
import { bindActionCreators } from "redux";
import { AppActions } from "store/actions/app-actions";
import { ThunkDispatch } from "redux-thunk";
import { Tag, Button, Row, Modal } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { invoke } from "api/axios";
import "./style.less";
import { SOURCE_MAP } from "api/source-map";

export interface IUserManagementProps extends RouteComponentProps {
  users: IUser[];
  editUser: (user: IUser) => void;
  removeUser: (id: string) => void;
  showSpin: (status: boolean) => void;
}

export interface IUserManagemenetState {}

export class UserManagement extends React.Component<
  IUserManagementProps,
  IUserManagemenetState
> {
  public state: IUserManagemenetState = {};

  public static getDerivedStateFromProps(
    nextProps: IUserManagementProps,
    prevState: IUserManagemenetState
  ) {
    return {};
  }

  private onEdit = (user: IUser) => {
    this.props.editUser(user);
    history.push("/role");
  };

  private onRemove = (id: string) => {
    this.props.removeUser(id);
  };

  private renderUserList() {
    const { users } = this.props;
    return users.map((user: IUser) => (
      <Row key={user.id}>
        <Tag style={{ width: 100 }}>{user.name}</Tag>
        <Button type="danger" onClick={() => this.onRemove(user.id)}>
          Remove User
        </Button>
        <Button onClick={() => this.onEdit(user)}>Edit User</Button>
      </Row>
    ));
  }

  private onLogin = () => {
    this.props.showSpin(true);
    const callbackURL = window.location.href;
    window.location.href =
      window.WEBSERVER + `/zh-cn/login?callbackURL=${callbackURL}&sysId=1`;
  };

  private onLogout = () => {
    this.props.showSpin(true);
    const callbackURL = window.location.href;
    window.location.href =
      window.WEBSERVER + `/zh-cn/logout?returnURL=${callbackURL}`;
  };

  private onTest = async () => {
    try {
      const res = await invoke({
        source: SOURCE_MAP.ANION,
        url: "/Hierarchy/358919/100107"
      });
      Modal.success({
        title: "Webserver returns",
        content: JSON.stringify(res),
        centered: true,
        okText: "确认"
      });
    } catch (err) {
      Modal.error({
        title: "Webserver responds with error",
        content: JSON.stringify(err),
        centered: true,
        okText: "确认"
      });
    }
  };

  public render() {
    return (
      <div className="user-management">
        <Button type="primary" onClick={this.onLogin}>
          Login
        </Button>
        <Button onClick={this.onLogout}>Logout</Button>
        <Button onClick={this.onTest}>Test</Button>
        <div style={{ paddingTop: 20 }}>{this.renderUserList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps: IUserManagementProps) => ({
  users: state.users
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: IUserManagementProps
) => ({
  editUser: bindActionCreators(editUser, dispatch),
  removeUser: bindActionCreators(removeUser, dispatch),
  showSpin: bindActionCreators(showSpin, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagement);
