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
import { SOURCE_MAP } from "api/source-map";
import io from "socket.io-client";
import "./style.less";

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

  public componentDidMount() {
    const event = "alarmcount";
    const url =
      "/web?event=alarmcount&sysType=1&userId=100107&customerId=358919";
    const socket = io.connect(url);
    socket.on("connect", () => {
      console.debug("connect success");
    });
    socket.on("reconnect_failed", () => {
      console.debug("connect failed, and reconnect");
    });
    socket.on(event, (result: any) => {
      console.debug(`RCV ${event} -> ${JSON.stringify(result)}`);
    });
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

  private onTest = async () => {
    try {
      const res = await invoke({
        source: SOURCE_MAP.CLASSIC,
        url: "/api/user/GetUserById/100107"
      });
      Modal.success({
        title: "Webserver returns",
        content: JSON.stringify(res),
        centered: true,
        okText: "确认"
      });
    } catch (err) {
      // pass
    }
  };

  public render() {
    return (
      <div className="user-management">
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
