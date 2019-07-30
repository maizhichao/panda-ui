const {
  override,
  overrideDevServer,
  fixBabelImports,
  addLessLoader
} = require("customize-cra");
const proxy = require("http-proxy-middleware");

const webpackConfig = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      //primary
      "@primary-color": "#3DCD58",
      "@success-color": "@primary-color",
      "@warning-color": "#FBB325",
      "@error-color": "#FF4D4D",
      "@highlight-color": "@error-color",
      "@border-radius-base": "2px",
      "@link-color": "@primary-color",
      "@info-color": "@link-color",
      "@border-color-base": "#E6E6E6",
      "@border-color-split": "@border-color-base",
      //disabled
      "@disabled-color": "#E6E6E6",
      "@disabled-bg": "#F2F2F2",
      //text
      "@heading-color": "#333333",
      "@text-color ": "#666666",
      "@text-color-secondary": "#999999",
      "@disabled-color ": "#c0c0c0",
      //font-family
      "@font-family":
        "PingFang SC, Microsoft YaHei Light, Microsoft YaHei, arial, sans-serif"
    }
  })
);

const devServerConfig = (config) => {
  return {
    ...config,
    before: function(app, server) {
      /**
       * Config the fake sso/acs API to
       * allow the localhost to successfully set the cookies
       */
      app.use(
        proxy("/__API__", {
          target: process.env.REACT_APP_WEBSERVER_API,
          changeOrigin: true,
          pathRewrite: {
            "^/__API__": ""
          }
        })
      );
      app.use(
        proxy("/__WS__", {
          target: process.env.REACT_APP_WEBSERVER_WS,
          changeOrigin: true,
          pathRewrite: {
            "^/__WS__": ""
          },
          ws: true
        })
      );
    }
  };
};

module.exports = {
  webpack: webpackConfig,
  devServer: overrideDevServer(devServerConfig)
};
