import { body, oneOf } from 'express-validator';

const schema = [
    body('Usuario')
        .isLength({ min: 3, max: 20})
        .withMessage('Debe contener minimo 3 caracteres y maximo 20!')
        .isAlpha()
        .withMessage('Debe ser alfabético'),
    body('Nombre')
        .isLength({ min: 3, max: 20})
        .withMessage('Debe contener minimo 3 caracteres y maximo 20!') 
        //.isAlpha('es-ES', {ignore: ' '})       
        .matches(/^[^ ][A-Za-zÀ-ÿ\s]+[^ ]$/)
        .withMessage('Debe ser alfabético y no puede terminar con espacios'),
    body('Apellido')
        .isLength({ min: 3, max: 20})
        .withMessage('Debe contener minimo 3 caracteres y maximo 20!')
        .matches(/^[^ ][A-Za-zÀ-ÿ\s]+[^ ]$/)
        .withMessage('Debe ser alfabético y no puede terminar con espacios'),
    body('Password').optional()
        .isLength({ min: 6, max: 20})
        .withMessage('Debe contener minimo 6 caracteres y maximo 20!')
        .matches(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9]{6,20}$/)
        .withMessage('Debe ser alfanumerica, admite mayusculas y un mínimo de 6 caracteres, no permite caracteres especiales'),    
    body('Email')
        .isEmail()
        .withMessage('No es un Email válido!')
        .isLength({ min: 3, max: 30})
        .withMessage('Debe ser mayor a 3 y menos a 30 caracteres!'),   
    oneOf([
        body('Perfil').equals('Usuario'),
        body('Perfil').equals('Admin'),
          ], 'Perfil no existe'),
];


export { schema as updateSchema };