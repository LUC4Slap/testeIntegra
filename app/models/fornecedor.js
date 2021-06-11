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
    cnpj: {
      type: String,
      required: true,
    },
  });

  return mongoose.model("Fornecedor", schema, "fornecedor");
};
