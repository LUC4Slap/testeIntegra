const mongoose = require("mongoose");

module.exports = function () {
  let schema = mongoose.Schema({
    nome: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    codigo: {
      type: String,
      required: true,
    },
    cnpjFornecedor: {
      type: String,
      required: true,
    },
  });

  return mongoose.model("Produtos", schema, "produtos");
};
