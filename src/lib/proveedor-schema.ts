import { body, oneOf } from 'express-validator';

const schema = [
    body('Id').optional()
        .isInt({ min: 1, max: 50000})
        .withMessage('Debe ser numérico y contener minimo 1 caracteres y maximo 50000!'),
    body('CodigoPostal')
        .isInt({ min: 1, max: 50000})
        .withMessage('Debe ser numérico y contener minimo 1 caracteres y maximo 50000!'),
    body('Direccion')
        .isLength({ min: 3, max: 100})
        .withMessage('Debe contener minimo 3 caracteres y maximo 100!')
        .matches(/^[^\s][A-ZÁÉÍÓÚa-zñáéíóú0-9\s]{3,}$/)
        .withMessage('Debe ser alfanumérico'),    
    body('Localidad')
        .isLength({ min: 3, max: 100})
        .withMessage('Debe contener minimo 3 caracteres y maximo 100!')
        .matches(/^[^\s][A-ZÁÉÍÓÚa-zñáéíóú0-9\s]{3,}$/)
        .withMessage('Debe ser alfanumérico'),
    body('Provincia')
        .isLength({ min: 3, max: 100})
        .withMessage('Debe contener minimo 3 caracteres y maximo 100!')
        .matches(/^[^\s][A-ZÁÉÍÓÚa-zñáéíóú\s]{3,}$/)
     .withMessage('Debe ser alfabética'),
    body('RazonSocial')
        .isLength({ min: 3, max: 150})
        .withMessage('Debe contener minimo 3 caracteres y maximo 150!')
        .matches(/(^[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+){2,})(\s[A-ZÁÉÍÓÚ]{1,}([a-zñáéíóú]+){0,})*$/)
        .withMessage('Debe ser alfabético y Nombre Propio'),
    body('NumeroDocumento')
        .isLength({ min: 3, max: 20})
        .withMessage('Debe contener minimo 3 caracteres y maximo 20!')
        //.matches(/^[0-9]{3,20}$/)
        .isInt({ min: 1, max: 2000000000})
        .withMessage('Debe ser numérico'), 
    body('Email')
        .isEmail().normalizeEmail()
        .withMessage('No es un Email válido!')
        .isLength({ min: 3, max: 30})
        .withMessage('Debe ser mayor a 3 y menos a 30 caracteres!'),
    body('Descripcion')
        .escape()        
        .isLength({ max: 200})
        .withMessage('No puede superar 200 caracteres!'),
    oneOf([
        body('TipoDocumento').equals('DNI'),
        body('TipoDocumento').equals('CUIL'),
        body('TipoDocumento').equals('CUIT'),
        body('TipoDocumento').equals('Otro'),
          ], 'TipoDocumento no existe'),
];

export { schema as proveedorSchema };