require("dotenv").config(); // Ele procura o arquivo .env na raiz do projeto e carrega as variáveis ​​que estão no arquivo .env na memória.

const db = require("./db");
const express = require('express');
//const mongoose = require('mongoose'); 
//const cliente = require('./models/cliente');
const app = express();


// como os dados que vamos inserir no banco de dados estão chegando no formato .json, temos que preparar o back-end para receber esses dados
app.use(express.json());


const port = process.env.PORT || 3000;

//rota para inserir clientes
/*app.post('/clientes', async (req, res) => {
    try {
        const cliente = new cliente(req.body);
        await cliente.save();
        res.status(201).send(cliente);
    } catch (err) {
        res.status(400).send({ error: 'Erro ao cadastrar cliente', detalhes: err.message });
    }
});*/
app.post('/clientes', async (req, res) => {
    await db.insertCustomer(req.body); 

    res.sendStatus(201).send({message: "Cliente cadastrado com sucesso!"}); // 201 é o código de sucesso para quando um recurso é criado com sucesso.
})


// app.get('caminho da rota', (função de callback que na verdade é a função que vai ser disparada quando a rota é chamada)=> {})
app.get('/clientes', async (req, res) => {
    try {
        const clientes = await cliente.find();
        res.status(200).send(clientes);
    } catch (err) {
        res.status(500).send({ error: 'Erro ao buscar clientes', detalhes: err.message });
    }
});





app.listen(port);

console.log("Backend rodando na porta " + port);