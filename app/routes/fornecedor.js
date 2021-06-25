const auth = require("../middleware/auth");
module.exports = function (app) {
  let controller = app.controllers.fornecedor;
  app.get("/", controller.index);
  app.get("/fornecedor/:cnpj", controller.selectFornecedorByCNPJAndProduto);
  app.post("/", auth, controller.newFornecedor);
  app.put("/", auth, controller.upDateFornecedor);
  app.put("/fornecedor/:cnpj", auth, controller.upDateFornecedorFromURL);
  app.delete("/", auth, controller.deleteFornecedor);
};
