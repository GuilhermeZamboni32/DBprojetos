require("dotenv").config(); // Ele procura o arquivo .env na raiz do projeto e carrega as variáveis ​​que estão no arquivo .env na memória.

const db = require("./db");

const port = process.env.PORT;

const express = require('express');

const app = express();

// como os dados que vamos inserir no banco de dados estão chegando no formato .json, temos que preparar o back-end para receber esses dados
app.use(express.json());

// app.get('caminho da rota', (função de callback que na verdade é a função que vai ser disparada quando a rota é chamada)=> {})



app.listen(port);

console.log("Backend is running")