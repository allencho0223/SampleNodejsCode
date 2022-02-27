"use strict";

const fs = require("fs"),
    http = require("http"),
    path = require("path"),
    db = require("./db");

const app = require("express")();
const bodyParser = require("body-parser");
app.use(bodyParser.json({
  strict: false
}));

const oasTools = require("oas-tools");
const jsyaml = require("js-yaml");
const { SERVER_HOSTNAME, SERVER_PORT } = require("./api/helper/config");

const spec = fs.readFileSync(path.join(__dirname, "/api/swagger/swagger.yaml"), "utf8");
const oasDoc = jsyaml.safeLoad(spec);

const options_object = {
  controllers: path.join(__dirname, "/api/controllers"),
  loglevel: "info",
  strict: false,
  router: true,
  validator: true
};

oasTools.configure(options_object);

oasTools.initialize(oasDoc, app, function () {
  app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
      description: err.description,
      message: err.message
    });
  });
  if (process.env.NODE_ENV !== 'test') {
    http.createServer(app).listen(SERVER_PORT, function () {
      console.log(`App running at http://${SERVER_HOSTNAME}:${SERVER_PORT}`);
      console.log("________________________________________________________________");
      if (options_object.docs !== false) {
        console.log(`API docs (Swagger UI) available on http://${SERVER_HOSTNAME}:${SERVER_PORT}/docs`);
        console.log("________________________________________________________________");
      }
    });
  }
});

module.exports = app;