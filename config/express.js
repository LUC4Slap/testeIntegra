const express = require("express");
const load = require("express-load");
const bodyParser = require("body-parser");

module.exports = function () {
  const app = express();
  app.set("port", 3000);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  load("models", { cwd: "app" }).then("controllers").then("routes").into(app);

  return app;
};
