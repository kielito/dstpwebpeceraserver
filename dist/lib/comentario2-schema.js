"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comentario2Schema = void 0;
const express_validator_1 = require("express-validator");
const schema = [
    express_validator_1.body('Titulo')
        .unescape(),
    express_validator_1.body('Comentario')
        .unescape(),
];
exports.comentario2Schema = schema;
//# sourceMappingURL=comentario2-schema.js.map