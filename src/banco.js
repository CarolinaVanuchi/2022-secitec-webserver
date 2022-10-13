const mysql = require('mysql2/promise');

async function conexao() {

    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'secitec'
    });

    return connection;
}

async function buscar() {
    const con = await conexao();
    const [linhas] = await con.query('SELECT * FROM sensor order by data_cadastro desc');
    return linhas;
}

async function cadastrar(frequencia, corrente) {
    const con = await conexao();
    const { rows } = await con.query(
    `INSERT INTO sensor (frequencia, corrente) VALUES (${frequencia}, ${corrente})`);
}

module.exports = {buscar, cadastrar}
