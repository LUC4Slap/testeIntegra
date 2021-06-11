# Teste Integrado Back End

## O que devia ser feito:

- 1. A API deve ter métodos para cadastro, consulta, edição e exclusão de
     fornecedores. (campos do cadastro de fornecedores: CNPJ do
     fornecedor e nome do fornecedor)

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

# ENDPOINTS FORNECEDOR

## Para Fornecedor

### Listagem

Para consultar todos os fornecedores cadastrados sera o / da api no seu endereço que estiver rodando o projeto
`http://localhost:3000`

### Novo Fornecedor

Passar um JSON com os campos `cnpj e nome` como abaixo

`{ "cnpj": "65920880000160", "nome": "Alumix" }`

### Listar fornecedor por cnpj

Para listar um fornecedor somente pelo cnpj basta acessar esta url passando como parametro o cnpj cadastrado e se o mesmo tiver produtos cadastrados je vira um Array com os produtos.

` http://localhost:3000/fornecedor/cnpj`

### Atualizar Fornecedor

Para atualizar o fornecedor deve passar o ID na url da requisição junto com um JSON no corpo com os campos que deseja atualizar

`http://localhost:3000/`

Exemplo de JSON:
`{ "cnpj": "65920880000160", "nome": "Alumix"}`

### Deletar Frornecedor

Para deletar um Fornecedor basta passar na url o id do fornecedor `http://localhost:3000/60c3c0cf144e181f20d6117a`

# ENDPOINTS PRODUTO
