"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repassSchema = void 0;
const express_validator_1 = require("express-validator");
const schema = [
    express_validator_1.body('Password')
        .isLength({ min: 6, max: 20 })
        .withMessage('Debe contener minimo 6 caracteres y maximo 20!')
        .matches(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9]{6,20}$/)
        .withMessage('Debe ser alfanumerica, admite mayusculas y un mínimo de 6 caracteres, no permite caracteres especiales'),
    express_validator_1.body('Repassword')
        .custom((value, { req }) => value === req.body.Password)
        .withMessage('Los password deben ser iguales')
];
exports.repassSchema = schema;
//# sourceMappingURL=repass-schema.js.map