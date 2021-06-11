const colors = require("colors");
const validCNPJ = require("../../utils/validCNPJ");

module.exports = function (app) {
  let Produtos = app.models.produtos;
  let controller = {
    index: (req, res) => {
      Produtos.find({}, [], { sort: { nome: 1 } })
        .exec()
        .then((fonecedor) => {
          res.status(200).json(fonecedor);
        });
    },
    newProduto: async (req, res) => {
      let codigo = req.body.codigo;
      let nome = req.body.nome;
      let cnpjFor = req.body.cnpjFornecedor;
      console.log(req.body);

      if (cnpjFor == undefined || nome == undefined || codigo == undefined) {
        res
          .status(404)
          .json({ message: "CNPJ, Nome ou Codigo não pode ser vazio" });
        return;
      }
      let cnpjValidado = validCNPJ(cnpjFor);

      if (cnpjValidado) {
        let verificaSeExiste = await Produtos.findOne({
          cnpj: cnpjFor,
        }).exec();
        if (verificaSeExiste) {
          res.status(404).json({ message: "CNPJ já cadastrado!" });
          return;
        } else {
          let data = new Produtos(req.body);
          data.save();
          res.status(200).json({ message: "Produto Cadastrado!" });
        }
      } else {
        res.status(404).json({ message: "CNPJ informado não é valido" });
      }
    },
    selectProdutoByCNPJ: async (req, res) => {
      let Fornecedor = app.models.fornecedor;
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
    upDateProduto: async (req, res) => {
      let id = req.params.id;
      // TUDO: MUDAR O JEITO DE ATUALIZAÇÃO UTILIZAR CNPJ NO LUGAR DO ID
      Produtos.findOneAndUpdate({ _id: id }, req.body, (err, doc) => {
        if (err) {
          res.status(500).send("Erro");
        }
        res.status(200).json({ message: "Produto Atualizado" });
      });
    },
    deleteproduto: async (req, res) => {
      let id = req.params.id;
      Produtos.findByIdAndRemove(id, (err, response) => {
        if (err) {
          res.status(500).send("ERRO PARA EXCLUIR");
        }
        res.status(200).json({ message: "Produto excluido" });
      });
    },
  };
  return controller;
};
