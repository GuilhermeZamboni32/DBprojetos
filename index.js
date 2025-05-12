require("dotenv").config();

const db = require("./db");

const express = require('express');

const mongoose = require('mongoose'); 


const Cliente = require('./models/Cliente');
 


const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());


app.post('/clientes', async (req, res) => {
    try {
        const cliente = new Cliente(req.body);
        await cliente.save();
        res.status(201).send(cliente);
    } catch (err) {
        res.status(400).send({ error: 'Erro ao cadastrar cliente', detalhes: err.message });
    }
});


app.listen(port, () => {
    console.log(`Rodando o Backend na porta ${port}`);
});
