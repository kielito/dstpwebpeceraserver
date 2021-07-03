"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comentarioModel_1 = __importDefault(require("../models/comentarioModel"));
class UserController {
    //CRUD
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const comentarios = yield comentarioModel_1.default.listar();
            return res.json(comentarios);
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const comentario = yield comentarioModel_1.default.buscarId(id);
            if (comentario)
                return res.json(comentario);
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const comentario = req.body;
            const result = yield comentarioModel_1.default.crear(comentario);
            if (!result)
                return res.status(400).json({ message: "No se pudo crear el comentario" });
            else {
                return res.status(200).json({ message: "Comentario creado " });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const encontro = yield comentarioModel_1.default.buscarId(id);
            if (encontro) {
                const comentario = req.body;
                const result = yield comentarioModel_1.default.actualizar(comentario, id);
                if (result) {
                    return res.status(200).json({ message: "Comentario actualizado correctamente" });
                }
                return res.status(400).json({ message: "No se pudo actualizar el comentario " });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const result = yield comentarioModel_1.default.eliminar(id);
            return res.status(200).json({ message: "Se eliminó el comentario correctamente!" });
        });
    }
    //FIN CRUD
    //METODO PARA CERRAR LA SESION
    endSession(req, res) {
        req.session.user = {}; //Se borran los datos del usuarios guardados en la variable user
        req.session.auth = false; //Se pone autenticado en false
        req.session.destroy(() => console.log("Sesion finalizada")); //Metodo para destruir datos asociados a la sesion
        res.redirect("/");
    }
}
const userController = new UserController();
exports.default = userController;
//# sourceMappingURL=comentarioController.js.map