"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchema = void 0;
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
        //.isAlpha('es-ES', {ignore: ' '})       
        .matches(/^[^ ][A-Za-zÀ-ÿ\s]+[^ ]$/)
        .withMessage('Debe ser alfabético y no puede terminar con espacios'),
    express_validator_1.body('Apellido')
        .isLength({ min: 3, max: 20 })
        .withMessage('Debe contener minimo 3 caracteres y maximo 20!')
        .matches(/^[^ ][A-Za-zÀ-ÿ\s]+[^ ]$/)
        .withMessage('Debe ser alfabético y no puede terminar con espacios'),
    express_validator_1.body('Password').optional()
        .isLength({ min: 6, max: 20 })
        .withMessage('Debe contener minimo 6 caracteres y maximo 20!')
        .matches(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9]{6,20}$/)
        .withMessage('Debe ser alfanumerica, admite mayusculas y un mínimo de 6 caracteres, no permite caracteres especiales'),
    express_validator_1.body('Email')
        .isEmail()
        .withMessage('No es un Email válido!')
        .isLength({ min: 3, max: 30 })
        .withMessage('Debe ser mayor a 3 y menos a 30 caracteres!'),
    express_validator_1.oneOf([
        express_validator_1.body('Perfil').equals('Usuario'),
        express_validator_1.body('Perfil').equals('Admin'),
    ], 'Perfil no existe'),
];
exports.updateSchema = schema;
//# sourceMappingURL=update-schema.js.map