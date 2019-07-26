import axios, { AxiosRequestConfig } from "axios";
import { Modal } from "antd";
import { SOURCE_MAP } from "./source-map";

const DEVELOPMENT = process.env.NODE_ENV !== "production";

export enum HTTP_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH"
}

export interface IFunctionOptions {
  source: SOURCE_MAP;
  url: string;
  method?: HTTP_METHOD;
  data?: any;
  params?: URLSearchParams | object;
}

function validateRequest(options: IFunctionOptions) {
  if (
    options.data &&
    [HTTP_METHOD.POST, HTTP_METHOD.PUT, HTTP_METHOD.PATCH].indexOf(
      options.method
    ) === -1
  ) {
    throw Error(
      "Function call attached with data is only appplicable for request methods 'PUT', 'POST' and 'PATCH'"
    );
  }
}

function throwUnknownError() {
  Modal.error({
    title: "错误",
    content: "未知错误",
    centered: true,
    okText: "确认"
  });
}

const axiosOptions: AxiosRequestConfig = {
  timeout: 2500,
  method: "POST",
  baseURL: window.WEBSERVER,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "cache-control": "no-cache",
    cache: "no-cache"
  },
  withCredentials: true,
  data: {}
};

const service = axios.create(axiosOptions);

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

export function invoke(options: IFunctionOptions) {
  if (DEVELOPMENT) {
    validateRequest(options);
  }

  return service.post("/api", options);
}

export interface ISubscribeOptions {
  // TODO: define subscribe options, similar with IFunctionOptions
}

export function subscribe(options: ISubscribeOptions) {
  // TODO: define subscribe
}
