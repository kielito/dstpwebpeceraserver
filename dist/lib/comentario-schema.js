"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comentarioSchema = void 0;
const express_validator_1 = require("express-validator");
const schema = [
    express_validator_1.body('Usuario')
        .isLength({ min: 3, max: 20 })
        .withMessage('Debe contener minimo 3 caracteres y maximo 20!')
        .isAlpha()
        .withMessage('Debe ser alfabético'),
    express_validator_1.body('Titulo')
        .trim()
        .escape()
        .isLength({ max: 100 })
        .withMessage('No puede superar 100 caracteres!'),
    express_validator_1.body('Comentario')
        .trim()
        .escape()
        .isLength({ max: 200 })
        .withMessage('No puede superar 200 caracteres!'),
];
exports.comentarioSchema = schema;
//# sourceMappingURL=comentario-schema.js.map