"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articuloSchema = void 0;
const express_validator_1 = require("express-validator");
const schema = [
    express_validator_1.body('Id').optional()
        .isInt({ min: 1, max: 50000 })
        .withMessage('Debe ser numérico y contener minimo 1 caracteres y maximo 50000!'),
    express_validator_1.body('CodigoProducto')
        .isLength({ min: 5, max: 50 })
        .withMessage('Debe contener minimo 5 caracteres y maximo 50!')
        .matches(/^[^\s][A-ZÁÉÍÓÚa-zñáéíóú0-9\s\-]{3,}$/)
        .withMessage('Debe ser alfanumérico'),
    express_validator_1.body('Descripcion')
        .isLength({ min: 3, max: 255 })
        .withMessage('Debe contener minimo 3 caracteres y maximo 255!')
        .matches(/^[^\s][A-ZÁÉÍÓÚa-zñáéíóú0-9\s\.]{3,}$/)
        .withMessage('Debe ser alfanumérico'),
    express_validator_1.body('RazonSocial')
        .isLength({ min: 3, max: 150 })
        .withMessage('Debe contener minimo 3 caracteres y maximo 150!')
        .matches(/(^[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+){2,})(\s[A-ZÁÉÍÓÚ]{1,}([a-zñáéíóú]+){0,})*$/)
        .withMessage('Debe ser alfabético y Nombre Propio'),
    express_validator_1.body('StockActual')
        .isInt({ min: 0, max: 10000 })
        .withMessage('Debe ser numérico y contener minimo 0 caracteres y maximo 10000!'),
    express_validator_1.body('PrecioVenta')
        .isFloat({ min: 0.01, max: 1000000 })
        .withMessage('Debe estar entre 0.01 y maximo 1000000!'),
];
exports.articuloSchema = schema;
//# sourceMappingURL=articulo-schema.js.map