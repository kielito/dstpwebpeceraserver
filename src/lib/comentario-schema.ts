import { body, oneOf } from 'express-validator';

const schema = [  
    body('Usuario')
        .isLength({ min: 3, max: 20})
        .withMessage('Debe contener minimo 3 caracteres y maximo 20!')
        .isAlpha()
        .withMessage('Debe ser alfabético'), 
    body('Titulo')
        .trim()
        .escape()        
        .isLength({ max: 100})
        .withMessage('No puede superar 100 caracteres!'),
    body('Comentario')
        .trim()
        .escape()
        .isLength({ max: 200})
        .withMessage('No puede superar 200 caracteres!'),
];

export { schema as comentarioSchema };