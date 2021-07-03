import { body, oneOf } from 'express-validator';

const schema = [    
    body('Password')
        .isLength({ min: 6, max: 20})
        .withMessage('Debe contener minimo 6 caracteres y maximo 20!')
        .matches(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9]{6,20}$/)
        .withMessage('Debe ser alfanumerica, admite mayusculas y un mínimo de 6 caracteres, no permite caracteres especiales'),
    body('Repassword')
        .custom((value, { req }) => value === req.body.Password)
        .withMessage('Los password deben ser iguales')
    ];

export { schema as repassSchema };