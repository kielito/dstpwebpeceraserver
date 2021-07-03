"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../lib/verifyToken");
const articuloController_1 = __importDefault(require("../controller/articuloController")); //ruta relativa
const validation_1 = require("../lib/validation");
const articulo_schema_1 = require("../lib/articulo-schema");
class ArticuloRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            req.session.auth = false;
            req.session.user = {};
            res.render("partials/signinForm");
        });
        this.router.get('/listar', verifyToken_1.TokenValidation, articuloController_1.default.listar);
        this.router.post('/agregarproducto', articulo_schema_1.articuloSchema, validation_1.validateRequestSchema, verifyToken_1.TokenValidation, articuloController_1.default.agregar);
        this.router.post('/editar', articulo_schema_1.articuloSchema, validation_1.validateRequestSchema, verifyToken_1.TokenValidation, articuloController_1.default.update);
        this.router.delete('/eliminar/:id', verifyToken_1.TokenValidation, articuloController_1.default.delete);
    }
}
const articuloRoutes = new ArticuloRoutes();
exports.default = articuloRoutes.router;
//# sourceMappingURL=articuloRoutes.js.map