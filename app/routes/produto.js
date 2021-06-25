const auth = require("../middleware/auth");
module.exports = function (app) {
  let controller = app.controllers.produto;
  app.get("/produto", controller.index);
  app.get("/produto/:cnpj", controller.selectProdutoByCNPJ);
  app.post("/produto", auth, controller.newProduto);
  app.put("/produto", auth, controller.upDateProduto);
  app.put("/produtoURL/:cnpj", auth, controller.upDateProdutoURL);
  app.delete("/produto/:id", auth, controller.deleteproduto);
};
