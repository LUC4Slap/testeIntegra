const colors = require("colors");
const validCNPJ = require("../../utils/validCNPJ");

module.exports = function (app) {
  let Produtos = app.models.produtos;
  // let Fornecedor = app.models.fornecedor;
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
    upDateProduto: async (req, res) => {
      let id = req.body._id;
      Produtos.findById(id, (err, doc) => {
        if (err) {
          res.status(500).send("Erro");
        }
        doc.cnpj = req.body.cnpj;
        doc.nome = req.body.nome;
        doc.codigo = req.body.codigo;
        doc.save();
        res.status(200).json({ message: "Fornecedor Atualizado" });
      });
    },
    deleteproduto: async (req, res) => {
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
