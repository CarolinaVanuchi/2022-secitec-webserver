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
    try {
        const [linhas] = await con.query('SELECT * FROM sensor order by data_cadastro desc');
        return linhas;
    } catch(erro) {
        console.log(erro);
        con.end();
    }
}

async function cadastrar(frequencia, corrente) {
    const con = await conexao();
    try {
        const { rows } = await con.query(
        `INSERT INTO sensor (frequencia, corrente) VALUES (${frequencia}, ${corrente})`);
    } catch (erro) {
        console.log(erro);
        con.end();
    }
}

module.exports = {conexao, buscar, cadastrar}
