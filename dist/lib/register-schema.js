"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const express_validator_1 = require("express-validator");
const schema = [
    express_validator_1.body('Usuario')
        .isLength({ min: 3, max: 20 })
        .withMessage('Debe contener minimo 3 caracteres y maximo 20!')
        .isAlpha()
        .withMessage('Debe ser alfabético'),
    express_validator_1.body('Nombre')
        .isLength({ min: 3, max: 20 })
        .withMessage('Debe contener minimo 3 caracteres y maximo 20!')
        .isAlpha('es-ES', { ignore: ' ' })
        .withMessage('Debe ser alfabético'),
    express_validator_1.body('Apellido')
        .isLength({ min: 3, max: 20 })
        .withMessage('Debe contener minimo 3 caracteres y maximo 20!')
        //.matches(/^[A-Za-zÀ-ÿ\s]{3,20}$/)
        //.matches(/^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$/)
        .matches(/(^[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+){2,})(\s[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+){2,})*$/)
        .withMessage('Debe ser alfabético y no puede terminar con espacios'),
    express_validator_1.body('Email')
        .isEmail().normalizeEmail()
        .withMessage('No es un Email válido!')
        .isLength({ min: 3, max: 30 })
        .withMessage('Debe ser mayor a 3 y menos a 30 caracteres!'),
    express_validator_1.oneOf([
        express_validator_1.body('Perfil').equals('Usuario'),
        express_validator_1.body('Perfil').equals('Admin'),
    ], 'Perfil no existe'),
];
exports.registerSchema = schema;
//# sourceMappingURL=register-schema.js.map