/**
 * This file is used purely for development and it has no impact on production build,
 * This is a middleware which serves as a proxy to webserver
 */
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/__WEBSERVER__", {
      target: process.env.REACT_APP_WEBSERVER_HOST,
      ws: true,
      changeOrigin: true,
      pathRewrite: {
        "^/__WEBSERVER__": ""
      }
    })
  );
};
