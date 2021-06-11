module.exports = function (app) {
  let controller = app.controllers.produto;
  app.get("/produto", controller.index);
  app.post("/produto", controller.newProduto);
  app.put("/produto", controller.upDateProduto);
  app.delete("/produto", controller.deleteproduto);
};
