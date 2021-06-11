# Teste Integrado Back End

## O que devia ser feito:

- 1. A API deve ter métodos para cadastro, consulta, edição e exclusão de
     fornecedores. (campos do cadastro de fornecedores: CNPJ do
     fornecedor e nome do fornecedor)
     [x]

- 2. A API deve ter métodos para cadastro, consulta, edição e exclusão de
     produtos. (campos do cadastro de produtos: código do produto, nome do
     produto e CNPJ do fornecedor)

- 3. Tenha em seu banco de dados 2 collections. Uma para armazenar os
     produtos e outra para armazenar os fornecedores.

- 4. A API deve ter um método para listar os produtos com filtrando com
     base no CNPJ do fornecedor.

- 5. Nos métodos de cadastro/edição do fornecedor e produto deve ser
     validado se o CNPJ é válido e retornar erro caso não seja.

### Para baixar o teste

`git clone https://github.com/LUC4Slap/testeIntegra.git`

### Para instalar as dependencias

`npm install ou yarn`

### Para rodar o projeto

Para rodar o projeto tem que ter o node instalado.

Para poder rodar o comando ` node server.js ou yarn server.js`

# ENDPOINTS

## Para Fornecedor

### Listagem

Para consultar todos os fornecedores cadastrados sera o / da api no seu endereço que estiver rodando o projeto
`http://localhost:3000`

### Novo Fornecedor

Passar um JSON com os campos `cnpj e nome` como abaixo

`{ "cnpj": "65920880000160", "nome": "Alumix" }`
