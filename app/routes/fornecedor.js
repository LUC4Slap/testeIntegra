module.exports = function (app) {
  let controller = app.controllers.fornecedor;
  app.get("/", controller.index);
  app.get("/:cnpj", controller.selectFornecedorByCNPJ);
  app.post("/", controller.newFornecedor);
  app.put("/", controller.upDateFornecedor);
  app.delete("/", controller.deleteFornecedor);
};
