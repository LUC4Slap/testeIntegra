module.exports = function (app) {
  let controller = app.controllers.fornecedor;
  app.get("/", controller.index);
  app.get("/fornecedor/:cnpj", controller.selectFornecedorByCNPJAndProduto);
  app.post("/", controller.newFornecedor);
  app.put("/", controller.upDateFornecedor);
  app.put("/fornecedor/:cnpj", controller.upDateFornecedorFromURL);
  app.delete("/", controller.deleteFornecedor);
};
