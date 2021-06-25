const mongoose = require("mongoose");

module.exports = function () {
  let schema = mongoose.Schema({
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      require: true,
    },
  });

  return mongoose.model("Users", schema, "users");
};
