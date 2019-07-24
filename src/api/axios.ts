import axios from "axios";
import { Modal } from "antd";

function throwUnknownError() {
  Modal.error({
    title: "错误",
    content: "未知错误",
    centered: true,
    okText: "确认"
  });
}
const service = axios.create({
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "cache-control": "no-cache",
    cache: "no-cache"
  },
  withCredentials: true,
  method: "GET",
  data: {}
});

service.interceptors.request.use(
  (config) => {
    config.url = window.WEBSERVER + config.url;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (res) => {
    if (res.data && res.data.Result) {
      return res.data.Result;
    }
    return res.data;
  },
  (err) => {
    if (!err.response) {
      throwUnknownError();
      return;
    }
    switch (err.response.status) {
      case 401: {
        Modal.warning({
          centered: true,
          content: "登录超时",
          okText: "确认",
          autoFocusButton: "ok",
          onOk: () => undefined
        });
        break;
      }
      default: {
        throwUnknownError();
      }
    }
  }
);

export default service;
