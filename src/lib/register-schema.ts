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
        .isAlpha('es-ES', {ignore: ' '})
        .withMessage('Debe ser alfabético'),
    body('Apellido')
        .isLength({ min: 3, max: 20})
        .withMessage('Debe contener minimo 3 caracteres y maximo 20!')
        //.matches(/^[A-Za-zÀ-ÿ\s]{3,20}$/)
        //.matches(/^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$/)
        .matches(/(^[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+){2,})(\s[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+){2,})*$/)
        .withMessage('Debe ser alfabético y no puede terminar con espacios'),    
    body('Email')
        .isEmail().normalizeEmail()
        .withMessage('No es un Email válido!')
        .isLength({ min: 3, max: 30})
        .withMessage('Debe ser mayor a 3 y menos a 30 caracteres!'),   
    oneOf([
        body('Perfil').equals('Usuario'),
        body('Perfil').equals('Admin'),
          ], 'Perfil no existe'),
];

export { schema as registerSchema };