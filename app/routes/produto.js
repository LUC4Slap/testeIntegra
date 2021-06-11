module.exports = function (app) {
  let controller = app.controllers.produto;
  app.get("/produto", controller.index);
  app.get("/produto/:cnpj", controller.selectProdutoByCNPJ);
  app.post("/produto", controller.newProduto);
  app.put("/produto/:id", controller.upDateProduto);
  app.delete("/produto/:id", controller.deleteproduto);
};
