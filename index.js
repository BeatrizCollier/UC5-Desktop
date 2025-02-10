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
  try {
    if(banco_dados.length === 0){
      return resposta.status(200).json({msg:"Não existe produto!"});
    }
    resposta.status(200).json(banco_dados)
  } catch (error) {
    resposta.status(500).json({msg:"Erro ao buscar produtos!"});
  }
})

//rota - cadastrar produtos
app.post('/produtos', (requisicao, resposta)=>{
    try{
      const {id, nome, preco, quantidade} = requisicao.body;
      const novoProduto = {id, nome, preco, quantidade}; //Adicionando a variável novoProduto os dados que enviei no body
      banco_dados.push(novoProduto); //Adicionando ao array banco_dados
      resposta.status(201).json(novoProduto); //Adicionando uma resposta de sucesso se o recurso ou produto for criado
    
    } catch (error){
      resposta.status(500).json({msg:"Erro ao cadastrar produtos"})
    }  
})

//Rota - Editar produto
//http://localhost:3000/1
app.put('/produtos/:id', (requisicao, resposta)=>{
  try {
    const id  = requisicao.params.id
    const produto = banco_dados.find(elemento => elemento.id === id) //para cada elemento do array vai verificar
    if(!produto){
      return resposta.status(404).json({msg:"Produto não encontrado!"});
    }
    const {novoNome, novoPreco, novaQuantidade} = requisicao.body;
    if (produto) {
      produto.nome = novoNome
      produto.preco = novoPreco
      produto.quantidade = novaQuantidade
      return produto
    }
    resposta.status(200).json(produto);
  } catch (error) {
    resposta.status(500).json({msg:"Erro ao editar produtos"})
  }
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})