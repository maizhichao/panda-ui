import React from "react";
import { connect } from "react-redux";
import { AppState } from "store/configure-store";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "store/actions/app-actions";
import { bindActionCreators } from "redux";
import { initialize } from "store/actions/main";
import { Layout, Spin } from "antd";
import "./style.less";
import Router from "router";
const { Content } = Layout;

interface ILinkDispatchProps {
  initialize: () => void;
  spinning: boolean;
}

type Props = ILinkDispatchProps;

class Main extends React.Component<Props> {
  componentDidMount() {
    this.props.initialize();
  }

  render() {
    return (
      <Content className="se-main-content">
        <Spin
          size="large"
          spinning={this.props.spinning}
          wrapperClassName="se-main-content-wrapper"
        >
          <Router />
        </Spin>
      </Content>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  users: state.users,
  spinning: state.main.spinning
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  initialize: bindActionCreators(initialize, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
