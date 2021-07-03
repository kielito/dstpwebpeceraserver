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
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendEmail_1 = require("../lib/sendEmail");
class UserController {
    signin(req, res) {
        res.render("partials/signinForm");
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var { Usuario, Email, Password } = req.body;
            //Usuario = Usuario.replace(/[='"]/g,'');
            //Email = Email.replace(/[='"]/g,'');
            console.log(Usuario, Email);
            const result = yield userModel_1.default.buscarUsuario(Usuario, Email);
            if (!result) {
                return res.status(500).json({ message: "Usuario y/o Email incorrectos" });
            }
            else {
                const correctPassword = yield userModel_1.default.validarPassword(Password, result.Password);
                if (correctPassword) {
                    req.session.user = result;
                    req.session.auth = true;
                    const sesion = req.session.user;
                    const token = jsonwebtoken_1.default.sign({ _id: result.id, _rol: result.rol }, "secretKey", {
                        expiresIn: '1d'
                    }); //Genera el Token del Usuario
                    return res.status(200).json({ message: "Bienvenido " + result.nombre, sesion, token: token });
                }
                else {
                    return res.status(500).json({ message: "Usuario y/o Clave incorrectos" });
                }
            }
        });
    }
    //REGISTRO
    signup(req, res) {
        //res.render("partials/signupForm");
    }
    activar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const result = yield userModel_1.default.habilitar(id);
            if (result) {
                const usuario = yield userModel_1.default.buscarId(id);
                return res.status(200).json("Usuario '" + usuario.Usuario + "' activado correctamente");
            }
            else {
                return res.status(400).json({ message: "No se encontró ningún usuario para activar" });
            }
        });
    }
    //HOME
    home(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*res.render("partials/home");
            return;
            /*if(!req.session.auth){
                req.flash('error','Debes iniciar sesion para ver esta seccion!');
                res.redirect("./signin");
            }
            res.render("partials/home");*/
        });
    }
    //CRUD
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield userModel_1.default.listar();
            return res.json(usuarios);
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuario = yield userModel_1.default.buscarId(id);
            if (usuario)
                return res.json(usuario);
            //req.flash('error','User doesnt exists!');
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body;
            delete usuario.Repassword;
            const busqueda = yield userModel_1.default.buscarUsuario(usuario.Usuario, usuario.Email);
            usuario.Password = yield userModel_1.default.encriptarPassword(usuario.Password);
            if (!busqueda) {
                const result = yield userModel_1.default.crear(usuario);
                if (!result)
                    return res.status(400).json({ message: "No se pudo registrar el usuario" });
                else {
                    sendEmail_1.EnvioEmail(usuario.Email, result);
                    return res.status(200).json({ message: "Usuario Registrado" });
                }
            }
            return res.status(500).json({ message: "El usuario y/o email ya se encuentra registrado!" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield userModel_1.default.buscarId(id);
            if (result) {
                const usuario = req.body;
                if (usuario.Password) {
                    if (usuario.Password.replace(' ', '') === '') {
                        delete usuario.Password;
                    }
                    else {
                        usuario.Password = yield userModel_1.default.encriptarPassword(usuario.Password);
                    }
                }
                const result = yield userModel_1.default.actualizar(usuario, id);
                if (result) {
                    return res.status(200).json({ message: "Usuario actualizado correctamente" });
                }
                return res.status(400).json({ message: "Error al actualizar los datos!" });
            }
            return res.status(400).json({ message: "El usuario no se encuentra registrado" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const result = yield userModel_1.default.eliminar(id);
            return res.status(200).json({ message: "Se eliminó el Usuario correctamente!" });
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
//# sourceMappingURL=userController.js.map