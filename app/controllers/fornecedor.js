const colors = require("colors");
const validCNPJ = require("../../utils/validCNPJ");

module.exports = function (app) {
  let Fornecedor = app.models.fornecedor;
  let controller = {
    index: (req, res) => {
      Fornecedor.find({}, [], { sort: { nome: 1 } })
        .exec()
        .then((fonecedor) => {
          res.status(200).json(fonecedor);
        });
    },
    selectFornecedorByCNPJAndProduto: async (req, res) => {
      let Produtos = app.models.produtos;
      let cnpjFor = req.params.cnpj;
      if (req.body === {} || cnpjFor === undefined) {
        res.status(404).json({ message: "CNPJ ou Nome não pode ser vazio" });
        return;
      }
      let cnpjValidado = validCNPJ(cnpjFor);
      if (cnpjValidado) {
        Fornecedor.findOne({ cnpj: cnpjFor })
          .then((fornecedor) => {
            Produtos.find({ cnpjFornecedor: cnpjFor })
              .then((produto) => {
                let result = { fornecedor: [] };
                result.fornecedor.push({
                  ...fornecedor._doc,
                  produtos: produto,
                });
                res.status(200).json(result);
              })
              .catch((err) => {
                res.status(500).json({ message: "Erro ao buscar produto".red });
              });
          })
          .catch((err) => {
            res.status(500).json({ message: "Erro ao buscar fornecedor".red });
          });
      } else {
        res.status(404).json({ message: "CNPJ não encontrado" });
      }
    },
    newFornecedor: async (req, res) => {
      let cnpjFor = req.body.cnpj;
      let nome = req.body.nome;

      if (req.body === {} || cnpjFor === undefined || nome === undefined) {
        res.status(404).json({ message: "CNPJ ou Nome não pode ser vazio" });
        return;
      }

      let cnpjValidado = validCNPJ(cnpjFor);

      if (cnpjValidado) {
        let verificaSeExiste = await Fornecedor.findOne({
          cnpj: cnpjFor,
        }).exec();
        if (verificaSeExiste) {
          res.status(404).json({ message: "CNPJ já cadastrado!" });
          return;
        } else {
          let data = new Fornecedor(req.body);
          data.save();
          res.status(200).json({ message: "Fornecedor Cadastrado!" });
        }
      } else {
        res.status(404).json({ message: "CNPJ informado não é valido" });
      }
    },
    upDateFornecedor: async (req, res) => {
      let id = req.body._id;
      Fornecedor.findById(id, (err, doc) => {
        if (err) {
          res.status(500).send("Erro");
        }
        doc.cnpj = req.body.cnpj;
        doc.nome = req.body.nome;
        doc.save();
        res.status(200).json({ message: "Fornecedor Atualizado" });
      });
    },
    deleteFornecedor: async (req, res) => {
      let id = req.body._id;
      Fornecedor.findByIdAndRemove(id, (err, response) => {
        if (err) {
          res.status(500).send("ERRO PARA EXCLUIR");
        }
        res.status(200).json({ message: "Fornecedor excluido" });
      });
    },
  };
  return controller;
};
