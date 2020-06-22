"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_controller_1 = require("../controllers/users.controller");
var users_controller_2 = require("../controllers/users.controller");
var users_controller_3 = require("../controllers/users.controller");
var users_controller_4 = require("../controllers/users.controller");
var users_controller_5 = require("../controllers/users.controller");
var express_1 = require("express");
var UsersRouter = express_1.Router();
UsersRouter.route('/')
    .get(users_controller_1.getUsers)
    .post(users_controller_3.addUser);
UsersRouter.route('/:userCPF')
    .get(users_controller_2.getUserByCPF);
UsersRouter.route('/login')
    .post(users_controller_4.login);
UsersRouter.route('/update')
    .post(users_controller_5.updateUser);
exports.default = UsersRouter;
