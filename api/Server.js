"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var users_route_1 = __importDefault(require("./routes/users.route"));
var works_route_1 = __importDefault(require("./routes/works.route"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        this.app.set('port', process.env.PORT || 4200);
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({
            extended: true
        }));
    };
    Server.prototype.routes = function () {
        this.app.use('/api/users', users_route_1.default);
        this.app.use('/api/works', works_route_1.default);
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get('port'), function () {
            console.log("Server rodando na porta " + _this.app.get('port') + "!");
        });
        // this.app.use(express.static(__dirname + '/../dist/dchild-front'));
        this.app.get('/', function (req, res) {
            res.send('Página inicial');
        });
    };
    return Server;
}());
var server = new Server();
server.start();
