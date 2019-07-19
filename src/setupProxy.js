/**
 * This file is used purely for development and it has no impact on production build,
 * This is a middleware which serves as a proxy to webserver
 */
const proxy = require("http-proxy-middleware");
const DEV_WEBSERVER = "http://localhost:8888";

module.exports = function(app) {
  app.use(
    proxy("/__WEBSERVER__", {
      target: DEV_WEBSERVER,
      changeOrigin: true,
      pathRewrite: {
        "^/__WEBSERVER__": "/"
      }
    })
  );
};
