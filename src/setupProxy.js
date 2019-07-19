/**
 * This file is used purely for development and it has no impact on production build,
 * This is a middleware which serves as a proxy to webserver
 */
const proxy = require("http-proxy-middleware");
const DEV_WEBSERVER = "http://localhost:8888"; // TODO: the path will change

module.exports = function(app) {
  app.use(
    proxy("/zh-cn", {
      target: DEV_WEBSERVER,
      changeOrigin: true
    })
  );
  app.use(
    proxy("/en-us", {
      target: DEV_WEBSERVER,
      changeOrigin: true
    })
  );
};
