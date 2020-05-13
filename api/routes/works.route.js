"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var works_controller_1 = require("../controllers/works.controller");
var works_controller_2 = require("../controllers/works.controller");
var express_1 = require("express");
var WorksRouter = express_1.Router();
WorksRouter.route('/')
    .get(works_controller_1.getWorks);
WorksRouter.route('/:workId')
    .get(works_controller_2.getWorkById);
exports.default = WorksRouter;
