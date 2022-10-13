const express = require('express');
const cors = require('cors');
const axios = require('axios');


const db = require('./src/banco');

const server = express();

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    server.use(cors());
    next();
});

server.get('/', (req, res) => {
    return res.json({
        mensagem: "API Secitec"
    })
});

server.get('/sensor', async (req, res) => {
    let dados = await db.buscar();
    res.status(200).send(dados);
})

server.listen(3000, () => {
    console.log('Iniciando Serviço');
})

setInterval(pegar_valores, 10000);

async function pegar_valores() {
    // let valores = await axios.get('http://172.16.80.163:4000/esp');
    let valores = await axios.get('http://localhost:4000/esp');
    console.log(valores.data);
    db.cadastrar(valores.data.frequency, valores.data.current);
}