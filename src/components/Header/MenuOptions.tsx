import React from "react";
import { Avatar, Popover, Button } from "antd";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "store/actions/app-actions";
import { bindActionCreators } from "redux";
import { showSpin } from "store/actions/main";
import { connect } from "react-redux";

export interface IMenuOptionsProps {}

export interface LinkDispatchProps {
  showSpin: (status: boolean) => void;
}

type Props = IMenuOptionsProps & LinkDispatchProps;

class MenuOptions extends React.Component<Props> {
  private onLogin = () => {
    this.props.showSpin(true);
    window.location.href = window.WEBSERVER + `/zh-cn/login?sysId=1`;
  };

  private onLogout = () => {
    this.props.showSpin(true);
    const backToLoginPage = window.location.href;
    window.location.href =
      window.WEBSERVER + `/zh-cn/logout?returnURL=${backToLoginPage}`;
  };

  private content = (
    <div>
      <Button type="primary" onClick={this.onLogin}>
        Login
      </Button>
      &nbsp;
      <Button type="danger" onClick={this.onLogout}>
        Logout
      </Button>
    </div>
  );

  render() {
    return (
      <Popover
        content={this.content}
        title="用户信息"
        trigger="click"
        placement="bottomRight"
      >
        <Avatar className="menu-option" icon="user" />
      </Popover>
    );
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  showSpin: bindActionCreators(showSpin, dispatch)
});

export default connect(
  undefined,
  mapDispatchToProps
)(MenuOptions);
