"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkById = exports.getWorks = void 0;
var config_1 = require("../sql/config");
function getWorks(req, res) {
    var query = "SELECT * FROM especialidade;";
    config_1.connection.query(query, function (err, results) {
        if (err)
            throw err;
        res.status(200).json(results);
    });
}
exports.getWorks = getWorks;
function getWorkById(req, res) {
    var data = req.params;
    var query = "SELECT * FROM especialidade WHERE id_especialidade = " + data.workId + ";";
    config_1.connection.query(query, function (err, results) {
        if (err)
            throw err;
        res.status(200).json(results[0]);
    });
}
exports.getWorkById = getWorkById;
