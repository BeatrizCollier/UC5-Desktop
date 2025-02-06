//Importando o express
const express = require('express');

//Importando a biblioteca dotenv
const dotenv = require('dotenv');

//Carregando as variáveis de ambiente
dotenv.config();

//Defininindo a porta
const port = process.env.PORTA

//Inicializando o servidor
const app = express()

//meio termo - middleware
app.use(express.json())


//VERBOS OU MÉTODOS - HTTP
//Pegar - GET
//Postar - POST
//Atualizar - PUT
//Deletar - DELETE

const banco_dados = [];

//Rota - listar produtos
app.get('/produtos', (requisicao, resposta) => {
  resposta.json(banco_dados)
})

//rota - cadastrar produtos
app.post('/produtos', (requisicao, resposta)=>{
    const {id, nome, preco} = requisicao.body; //Passando na requisição o id, nome e  preço
    const novoProduto = {id, nome, preco}; //Adicionando a variável novoProduto os dados que enviei no body
    banco_dados.push(novoProduto); //Adicionando ao array banco_dados
    resposta.status(201).json({mensagem:"Produto criado com sucesso!"}) //Adicionando uma resposta de sucesso se o recurso ou produto for criado
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})