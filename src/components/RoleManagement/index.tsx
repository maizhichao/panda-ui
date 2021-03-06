import React from "react";
import { connect } from "react-redux";
import { showSpin } from "store/actions/main";
import { bindActionCreators } from "redux";
import { AppActions } from "store/actions/app-actions";
import { ThunkDispatch } from "redux-thunk";
import { Form, Button, Row, Modal, AutoComplete, Input, Select } from "antd";
import { invoke, HTTP_METHOD, IFunctionOptions } from "api/axios";
import { SOURCE_MAP } from "api/source-map";
import { SelectValue } from "antd/lib/select";
import "./style.less";

const DATA_SOURCE = Object.keys(SOURCE_MAP);

export interface IRoleManagementProps {
  showSpin: (status: boolean) => void;
}

export interface IRoleManagemenetState {
  source: SOURCE_MAP;
  url: string;
  method: HTTP_METHOD;
  body: string;
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
    body: null,
    dataSource: DATA_SOURCE
  };

  private onFetch = async () => {
    const { source, url, method, body } = this.state;
    try {
      const funcOptions: IFunctionOptions = {
        source: source,
        url: url,
        method: method
      };
      if (method === HTTP_METHOD.POST) {
        funcOptions.data = body;
      }
      const res = await invoke(funcOptions);
      Modal.success({
        title: "Webserver returns",
        content: (
          <pre
            style={{
              maxHeight: 450
            }}
          >
            <code className="prettyprint">{JSON.stringify(res, null, 2)}</code>
          </pre>
        ),
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

  private onSourceChange = (value: SelectValue) => {
    this.setState({ source: value as SOURCE_MAP });
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
                onChange={this.onSourceChange}
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
            {this.state.method === HTTP_METHOD.POST && (
              <Form.Item label="BODY">
                <Input.TextArea
                  placeholder="Please enter request body"
                  value={this.state.body}
                  onChange={(e) => this.setState({ body: e.target.value })}
                />
              </Form.Item>
            )}
            <Button
              type="primary"
              disabled={!this.state.source || !this.state.url}
              onClick={this.onFetch}
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
