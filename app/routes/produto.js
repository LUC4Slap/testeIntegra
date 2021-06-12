module.exports = function (app) {
  let controller = app.controllers.produto;
  app.get("/produto", controller.index);
  app.get("/produto/:cnpj", controller.selectProdutoByCNPJ);
  app.post("/produto", controller.newProduto);
  app.put("/produto", controller.upDateProduto);
  app.put("/produtoURL/:cnpj", controller.upDateProdutoURL);
  app.delete("/produto/:id", controller.deleteproduto);
};
