"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_controller_1 = require("../controllers/users.controller");
var express_1 = require("express");
var UsersRouter = express_1.Router();
UsersRouter.route('/')
    .get(users_controller_1.getWorkers);
exports.default = UsersRouter;
