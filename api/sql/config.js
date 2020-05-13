"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
var mysql_1 = __importDefault(require("mysql"));
var connection = mysql_1.default.createConnection({
    host: '35.199.82.20',
    user: 'root',
    database: 'bicus',
    password: '@bicus@'
});
exports.connection = connection;
connection.connect(function (err) {
    if (err) {
        console.error('Error: ' + err.stack);
        return;
    }
    console.log('Conectado em: ' + connection.config.database);
});
