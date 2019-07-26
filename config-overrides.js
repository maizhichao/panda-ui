const {
  override,
  overrideDevServer,
  fixBabelImports,
  addLessLoader
} = require("customize-cra");
const request = require("request-promise");
const bodyParser = require("body-parser");

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
      app.use(bodyParser());
      app.post("/:lang/sso/acs", (req, res) => {
        const { callbackURL } = req.query;
        request({
          method: "POST",
          uri: process.env.REACT_APP_WEBSERVER_HOST + "/dev-server-login",
          body: req.body,
          json: true,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "cache-control": "no-cache",
            cache: "no-cache"
          },
          resolveWithFullResponse: true
        })
          .then((ret) => {
            Object.keys(ret.headers).forEach((key) => {
              res.append(key, ret.headers[key]);
            });
            res.redirect(callbackURL);
          })
          .catch((err) => {
            console.log("TCL: devServerConfig -> err");
          });
      });
    },
    allowedHosts: ["tiger.energymost.com", "localhost:8888"]
  };
};

module.exports = {
  webpack: webpackConfig,
  devServer: overrideDevServer(devServerConfig)
};
