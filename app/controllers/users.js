const colors = require("colors");
const senha = require("../../utils/encriptSenha");
const jwt = require("jsonwebtoken");
const envarioment = require("../common/envarioment");
module.exports = function (app) {
  let User = app.models.users;
  let controller = {
    index: (req, res) => {
      User.find({}, [], { sort: { nome: 1 } })
        .exec()
        .then((usuarios) => {
          res.status(200).json(usuarios);
        });
    },
    newUser: (req, res) => {
      let { nome, email, password, level } = req.body;
      if (nome == undefined || email == undefined || password == undefined) {
        res
          .status(404)
          .json({ message: "Nome, E-mail ou Senha não pode ser vazio" });
      }
      User.findOne({ email })
        .then((user) => {
          if (user) {
            res.status(404).json({ message: "Usuario já cadastrado" });
            return;
          } else {
            senha.encriptSenha(password).then((hash) => {
              let user = new User({ nome, email, password: hash, level });
              user.save();
              res.status(200).json({ message: "Usuario Cadastrado" });
            });
          }
        })
        .catch((err) => {
          res.json(err);
        });
    },

    updateUser: (req, res) => {
      let { email, password } = req.body;
      if (req.body.password) {
        senha.encriptSenha(req.body.password).then((hash) => {
          User.findOneAndUpdate(
            { email },
            { ...req.body, password: hash },
            (err, doc) => {
              if (err) {
                res
                  .status(404)
                  .json({ message: "Um erro inesperado aconteceu" });
                return;
              } else {
                res.status(200).json({ message: "Usuario atulaizado" });
              }
            }
          );
        });
      }
    },

    login: (req, res) => {
      let { email, password } = req.body;
      User.findOne({ email }).then((user) => {
        senha.conparSenha(password, user.password).then((resp) => {
          if (resp) {
            const token = jwt.sign(
              { sub: user.email, level: user.level, iss: "api-fonecedor" },
              envarioment.saltJWT
            );
            res.json({ token });
          } else {
            res.status(404).json({ message: "E-mail ou senha invalidos" });
          }
        });
      });
    },

    deleteUser: (req, res) => {
      let id = req.params.id;
      User.findByIdAndRemove(id, (err, response) => {
        if (err) {
          res.status(500).send("ERRO PARA EXCLUIR");
        }
        console.log(response);
        res.status(200).json({ message: "Usuario excluido" });
      });
    },
  };
  return controller;
};
