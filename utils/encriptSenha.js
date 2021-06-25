const bcript = require("bcrypt");
const cript = {
  encriptSenha: (senha) => {
    return bcript.hash(senha, 10);
  },
  conparSenha: (senhaReq, senhaAtual) => {
    return bcript.compare(senhaReq, senhaAtual);
  },
};

module.exports = cript;
