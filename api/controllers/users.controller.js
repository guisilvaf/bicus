"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.getWorkers = exports.addUser = exports.getUserByCPF = exports.getUsers = void 0;
var config_1 = require("../sql/config");
function getUsers(req, res) {
    var query = "SELECT u.cpf, u.nome, u.data_nascimento, u.email, u.senha, u.sexo, u.estado_civil, u.data_cadastro,\n    t.preco, t.descricao, t.disponibilidade, e.especialidade FROM usuario u \n    LEFT JOIN trabalhador t ON u.cpf = t.cpf\n    LEFT JOIN trabalhador_especialidade te ON u.cpf = te.cpf\n    LEFT JOIN especialidade e ON te.id_especialidade = e.id_especialidade;";
    config_1.connection.query(query, function (err, results) {
        if (err)
            throw err;
        var count = 0;
        results.forEach(function (result, index, array) {
            // Pegar telefone
            var query1 = "SELECT celular, fixo FROM telefone WHERE cpf_usuario = '" + result.cpf + "'";
            config_1.connection.query(query1, function (err, phones) {
                if (err)
                    throw err;
                var userPhones = [];
                phones.forEach(function (phone) {
                    userPhones.push({ cell: phone.celular, phone: phone.fixo });
                });
                results[index].userNumbers = userPhones;
            });
            // Pegar endereço.
            var query2 = "SELECT cep, logradouro, bairro, cidade, uf, numero, complemento FROM endereco WHERE cpf_usuario = '" + result.cpf + "'";
            config_1.connection.query(query2, function (err, address) {
                if (err)
                    throw err;
                var userAddress = [];
                address.forEach(function (address) {
                    userAddress.push({
                        cep: address.cep,
                        endereco: address.logradouro,
                        bairro: address.bairo,
                        cidade: address.cidade,
                        uf: address.uf,
                        numero: address.numero,
                        complemento: address.complemento
                    });
                });
                results[index].userAddress = userAddress;
                count++;
                if (count === array.length) {
                    res.status(200).json(results);
                }
            });
        });
    });
}
exports.getUsers = getUsers;
function getUserByCPF(req, res) {
    var data = req.params;
    var query = "SELECT u.cpf, u.nome, u.data_nascimento, u.email, u.senha, u.sexo, u.estado_civil, u.data_cadastro,\n    t.preco, t.descricao, t.disponibilidade, e.especialidade FROM usuario u \n    LEFT JOIN trabalhador t ON u.cpf = t.cpf\n    LEFT JOIN trabalhador_especialidade te ON u.cpf = te.cpf\n    LEFT JOIN especialidade e ON te.id_especialidade = e.id_especialidade\n    WHERE u.cpf = " + data.userCPF + ";";
    config_1.connection.query(query, function (err, results) {
        if (err)
            throw err;
        // Pegar telefone    
        var query1 = "SELECT celular, fixo FROM telefone WHERE cpf_usuario = '" + results[0].cpf + "';";
        config_1.connection.query(query1, function (err, phones) {
            if (err)
                throw err;
            var userPhones = [];
            phones.forEach(function (phone) {
                userPhones.push({ cell: phone.celular, phone: phone.fixo });
            });
            results[0].userNumbers = userPhones;
        });
        // Pegar enderecos   
        var query2 = "SELECT cep, logradouro, bairro, cidade, uf, numero, complemento FROM endereco WHERE cpf_usuario = '" + results[0].cpf + "'";
        config_1.connection.query(query2, function (err, address) {
            if (err)
                throw err;
            var userAddress = [];
            address.forEach(function (address) {
                userAddress.push({
                    cep: address.cep,
                    endereco: address.logradouro,
                    bairro: address.bairo,
                    cidade: address.cidade,
                    uf: address.uf,
                    numero: address.numero,
                    complemento: address.complemento
                });
            });
            results[0].userAddress = userAddress;
            res.status(200).json(results[0]);
        });
    });
}
exports.getUserByCPF = getUserByCPF;
function addUser(req, res) {
    var data = req.body;
    var query = "INSERT INTO usuario (cpf, nome, data_nascimento, email, senha, sexo, estado_civil)\n              VALUES ('" + data.cpf + "', '" + data.username + "', '" + data.born + "', '" + data.email + "', '" + data.password + "', '" + data.gender + "', '" + data.civil + "');";
    config_1.connection.query(query, function (err) {
        if (err)
            throw err;
        // Adicionar tabela endereço.
        var queryEnde = "INSERT INTO endereco (cep, logradouro, bairro, cidade, uf, numero, complemento, cpf_usuario)\n                    VALUES ('" + data.cep + "', '" + data.endereco + "', '" + data.bairro + "', '" + data.city + "', '" + data.uf + "', '" + data.numero + "', '" + data.complemento + "', '" + data.cpf + "');";
        config_1.connection.query(queryEnde, function (err) {
            if (err)
                throw err;
        });
        // Adicionar na tabela telefone.
        var query1 = "INSERT INTO telefone (celular, fixo, cpf_usuario)\n                    VALUES ('" + data.cell + "', '" + data.phone + "', '" + data.cpf + "');";
        config_1.connection.query(query1, function (err) {
            if (err)
                throw err;
        });
        // Caso o usuário for um trabalhador, inserir dados na tabela trabalhador e trabalhador_especialidade.
        if (data.speciality != null) {
            var query3 = "INSERT INTO trabalhador (cpf, preco, descricao, disponibilidade)\n                    VALUES ('" + data.cpf + "', " + data.price + ", '" + data.desc + "', '" + data.availability + "');";
            config_1.connection.query(query3, function (err) {
                if (err)
                    throw err;
            });
            var query4 = "INSERT INTO trabalhador_especialidade (cpf, id_especialidade)\n                    VALUES ('" + data.cpf + "', " + data.speciality + ");";
            config_1.connection.query(query4, function (err) {
                if (err)
                    throw err;
            });
        }
        res.status(201).json({ status: 'Sucesso', message: 'Usuário adicionado!' });
    });
}
exports.addUser = addUser;
function getWorkers(req, res) {
    var query = "SELECT u.cpf, u.nome, u.data_nascimento, u.email, u.senha, u.sexo, u.estado_civil, u.data_cadastro,\n    t.preco, t.descricao, t.disponibilidade, e.especialidade FROM usuario u \n    INNER JOIN trabalhador t ON u.cpf = t.cpf\n    INNER JOIN trabalhador_especialidade te ON u.cpf = te.cpf\n    INNER JOIN especialidade e ON te.id_especialidade = e.id_especialidade;";
    config_1.connection.query(query, function (err, results) {
        if (err)
            throw err;
        // Pegar telefone
        var count = 0;
        results.forEach(function (result, index, array) {
            var query1 = "SELECT celular, fixo FROM telefone WHERE cpf_usuario = '" + result.cpf + "'";
            config_1.connection.query(query1, function (err, phones) {
                if (err)
                    throw err;
                var userPhones = [];
                phones.forEach(function (phone) {
                    userPhones.push({ cell: phone.celular, phone: phone.fixo });
                });
                results[index].userNumbers = userPhones;
            });
            // Pegar endereço.
            var query2 = "SELECT cep, logradouro, bairro, cidade, uf, numero, complemento FROM endereco WHERE cpf_usuario = '" + result.cpf + "'";
            config_1.connection.query(query2, function (err, address) {
                if (err)
                    throw err;
                var userAddress = [];
                address.forEach(function (address) {
                    userAddress.push({
                        cep: address.cep,
                        endereco: address.logradouro,
                        bairro: address.bairo,
                        cidade: address.cidade,
                        uf: address.uf,
                        numero: address.numero,
                        complemento: address.complemento
                    });
                });
                results[index].userAddress = userAddress;
                count++;
                if (count === array.length) {
                    res.status(200).json(results);
                }
            });
        });
    });
}
exports.getWorkers = getWorkers;
function login(req, res) {
    var data = req.body;
    var query = "SELECT * FROM usuario WHERE email = '" + data.email + "' AND senha = '" + data.password + "';";
    config_1.connection.query(query, function (err, results) {
        if (err)
            throw err;
        res.status(200).json(results[0]);
    });
}
exports.login = login;
