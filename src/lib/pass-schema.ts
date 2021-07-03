import { body, oneOf } from 'express-validator';

const schema = [    
    body('Password').optional()
        .isLength({ min: 6, max: 20})
        .withMessage('Debe contener mínimo 6 caracteres y máximo 20!')
        .matches(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9]{6,20}$/)
        .withMessage('Debe ser alfanumerica, admite mayusculas y un mínimo de 6 caracteres, no permite caracteres especiales')    
];


export { schema as passSchema };