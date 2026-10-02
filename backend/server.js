const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")
require("dotenv").config()

const app = express()

//permitir receber o json
app.use(express.json())

//permitir conexão com o react-front
app.use(cors())

//conexão ao banco de dados - filtro com ações de variávies de ambiente
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//teste de conexão
db.connect((erro) => {
    if(erro){
        console.log("Erro ao se conectar ao MYSQL!!")
        console.log(erro)
        return
    }
    console.log("MySql conectado com sucesso!!!!")
})
//rotas - HTTP - get, post, put, delete
//rota principal
app.get("/", (req, res) => {
    res.send("API de cadastro funcionando!!")
})
//rota de busca de pessoas
app.get("/pessoas", (req, res) => {
    const sql = "select * from pessoas"
    db.query(sql, (erro, resultado) => {
        if(erro){
            console.log(erro)
            return res.status(500).json({
                erro: "Erro ao buscar dados!"
            })
        }
        res.json(resultado)
    })
})
//buscara pessoa por id
app.get("/pessoas/:id", (req, res) => {
    const id = req.params.id
    const sql = "select * from pessoas where id = ?"
    db.query(sql, [id],(erro, resultado) => {
        if(erro){
            console.log(erro)
            return res.status(500).json({
                erro: "Erro ao buscar pessoas!"
            })
        }
        if(resultado.length === 0){
            return res.status(404).json({
                mensagem: "Pessoa não encontrada!"
            })
        }
        res.json(resultado[0])
    })
})
//post, put e delete
//post cadastrar
app.post("/pessoas", (req, res) => {
    const {nome, cpf} = req.body
    if(!nome || !cpf){
        return res.status(400).json({
            mensagem: "Nome e CPF são obrigatórios"
        })
    }
    const sql = "insert into pessoas(nome, cpf) values(?, ?)"
    db.query(sql, [nome, cpf], (erro, resultado) => {
        if(erro){
            console.log(erro)
            return res.status(500).json({
                erro: "Erro ao cadastrar Pessoas!"
            })
        }
        res.status(201).json({
            menssagem: "Pessoa cadastarda com sucesso!",
            pessoa: {
                id: resultado.insertId,
                nome: nome,
                cpf: cpf

            }
        })
    })
})
//Gerado pela IA
// ==========================================
// PUT - ATUALIZAR PESSOA
// ==========================================

app.put("/pessoas/:id", (req, res) => {

    const id = req.params.id;

    const { nome, cpf } = req.body;

    if (!nome || !cpf) {

        return res.status(400).json({
            mensagem: "Nome e CPF são obrigatórios"
        });

    }

    const sql = `UPDATE pessoas SET nome = ?, cpf = ? WHERE id = ?`;

    db.query(sql, [nome, cpf, id], (erro, resultado) => {

        if (erro) {

            console.log(erro);

            return res.status(500).json({
                erro: "Erro ao atualizar pessoa"
            });

        }

        if (resultado.affectedRows === 0) {

            return res.status(404).json({
                mensagem: "Pessoa não encontrada"
            });

        }

        res.json({

            mensagem: "Pessoa atualizada com sucesso!",

            pessoa: {
                id: id,
                nome: nome,
                cpf: cpf
            }

        });

    });

});


// ==========================================
// DELETE - EXCLUIR PESSOA
// ==========================================

app.delete("/pessoas/:id", (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM pessoas WHERE id = ?";

    db.query(sql, [id], (erro, resultado) => {

        if (erro) {

            console.log(erro);

            return res.status(500).json({
                erro: "Erro ao excluir pessoa"
            });

        }

        if (resultado.affectedRows === 0) {

            return res.status(404).json({
                mensagem: "Pessoa não encontrada"
            });

        }

        res.json({
            mensagem: "Pessoa excluída com sucesso!"
        });

    });

});

//iniciar o servidor
const PORTA = 3010
app.listen(PORTA, () =>{
    console.log(`Servidor subindo na porta: ${PORTA}`)
})

