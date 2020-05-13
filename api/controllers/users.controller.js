"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.getUserById = exports.getUsers = void 0;
var config_1 = require("../sql/config");
function getUsers(req, res) {
    var query = "SELECT * FROM usuario INNER JOIN trabalhador ON usuario.id_usuario = trabalhador.id_trabalhador\n              INNER JOIN trabalhador_especialidade AS t ON usuario.id_usuario = t.id_trabalhador\n              INNER JOIN especialidade AS speciality ON t.id_especialidade = speciality.id_especialidade;";
    config_1.connection.query(query, function (err, results) {
        if (err)
            throw err;
        // Removendo dados inuteis para o front.
        results.map(function (a) {
            delete a.id_trabalhador;
            delete a.id_especialidade;
        });
        res.status(200).json(results);
    });
}
exports.getUsers = getUsers;
function getUserById(req, res) {
    var data = req.params;
    var query = "SELECT * FROM usuario INNER JOIN trabalhador ON usuario.id_usuario = trabalhador.id_trabalhador \n              INNER JOIN trabalhador_especialidade AS t ON usuario.id_usuario = t.id_trabalhador\n              INNER JOIN especialidade AS speciality ON t.id_especialidade = speciality.id_especialidade \n              WHERE id_usuario = " + data.userId + " ;";
    config_1.connection.query(query, function (err, results) {
        if (err)
            throw err;
        // Removendo dados inuteis para o front.
        results.map(function (a) {
            delete a.id_trabalhador;
            delete a.id_especialidade;
        });
        res.status(200).json(results[0]);
    });
}
exports.getUserById = getUserById;
function addUser(req, res) {
    var data = req.body;
    var query = "INSERT INTO usuario (nome_usuario, data_nascimento, email, senha, telefone_celular, telefone_fixo)\n              VALUES ('" + data.username + "', '" + data.born + "', '" + data.email + "', '" + data.password + "', '" + data.cell + "', '" + data.phone + "');";
    config_1.connection.query(query, function (err) {
        if (err)
            throw err;
        // Caso o usuário for um trabalhador, inserir dados na tabela trabalhador e trabalhador_especialidade.
        if (data.speciality) {
            var query1 = "INSERT INTO trabalhador (id_trabalhador, preco, descricao, disponibilidade)\n                    VALUES (LAST_INSERT_ID(), '" + data.price + "', '" + data.desc + "', '" + data.availability + "');";
            config_1.connection.query(query1, function (err) {
                if (err)
                    throw err;
            });
            var query2 = "INSERT INTO trabalhador_especialidade (id_trabalhador, id_especialidade)\n                    VALUES (LAST_INSERT_ID(), " + data.speciality + ");";
            config_1.connection.query(query2, function (err) {
                if (err)
                    throw err;
            });
        }
        res.status(201).json({ status: 'Sucesso', message: 'Usuário adicionado!' });
    });
}
exports.addUser = addUser;
