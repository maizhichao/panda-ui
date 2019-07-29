import React from "react";
import { connect } from "react-redux";
import { showSpin } from "store/actions/main";
import { bindActionCreators } from "redux";
import { AppActions } from "store/actions/app-actions";
import { ThunkDispatch } from "redux-thunk";
import { Form, Button, Row, Modal, AutoComplete, Input, Select } from "antd";
import { invoke, HTTP_METHOD } from "api/axios";
import "./style.less";
import { SOURCE_MAP } from "api/source-map";
import { SelectValue } from "antd/lib/select";

const DATA_SOURCE = Object.keys(SOURCE_MAP);

export interface IRoleManagementProps {
  showSpin: (status: boolean) => void;
}

export interface IRoleManagemenetState {
  source: SOURCE_MAP;
  url: string;
  method: HTTP_METHOD;
  dataSource: string[];
}

export class RoleManagement extends React.Component<
  IRoleManagementProps,
  IRoleManagemenetState
> {
  public state: IRoleManagemenetState = {
    source: SOURCE_MAP.CLASSIC,
    url: "/api/user/GetUserById/100107",
    method: HTTP_METHOD.GET,
    dataSource: DATA_SOURCE
  };

  private onTest = async () => {
    const { source, url, method } = this.state;
    try {
      const res = await invoke({
        source: source,
        url: url,
        method: method
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

  private onSelect = (value: SelectValue) => {
    this.setState({ source: value as SOURCE_MAP });
  };

  private handleSearch = (value: string) => {
    let dataSource = DATA_SOURCE;
    if (value) {
      dataSource = this.state.dataSource.filter((v) => v.indexOf(value) > -1);
    }
    this.setState({ dataSource });
  };

  public render() {
    const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"].map((m) => (
      <Select.Option key={m}>{m}</Select.Option>
    ));
    return (
      <div className="role-management">
        <Form>
          <Row justify="center" align="middle">
            <Form.Item label="SOURCE">
              <AutoComplete
                dataSource={this.state.dataSource}
                value={this.state.source}
                style={{ width: 500 }}
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                placeholder="SOURCE"
              />
            </Form.Item>
            <Form.Item label="URL">
              <Input
                placeholder="URL"
                value={this.state.url}
                onChange={(e) =>
                  this.setState({
                    url: e.target.value
                  })
                }
              />
            </Form.Item>
            <Form.Item label="METHOD">
              <Select
                placeholder="HTTP METHOD"
                value={this.state.method}
                onChange={(value: any) => this.setState({ method: value })}
              >
                {methods}
              </Select>
            </Form.Item>
            <Button
              disabled={!this.state.source || !this.state.url}
              onClick={this.onTest}
            >
              FETCH
            </Button>
          </Row>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  showSpin: bindActionCreators(showSpin, dispatch)
});

export default connect(
  undefined,
  mapDispatchToProps
)(RoleManagement);
