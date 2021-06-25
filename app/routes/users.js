const auth = require("../middleware/auth");
module.exports = function (app) {
  let controller = app.controllers.users;
  app.get("/users", auth, controller.index);
  app.post("/users", auth, controller.newUser);
  app.put("/users", auth, controller.updateUser);
  app.delete("/users/:id", auth, controller.deleteUser);

  app.post("/login", controller.login);
};
