import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

interface IPayload {
    _id: string;
    _rol: string;
    iat: number;
    exp: number;
}

export const TokenValidation = (req:Request, res:Response, next:NextFunction) => {
	//Recuperamos la cabecera y la dividimos en 2    
    let token:any = (req.header("Authotization")?.split('Baerer ',2));
    
    //tomamos la parte que nos interesa, el token, para despues evaluar.
    token = token['1'];
    console.log("Evaluando token recibido");    

    try {
        //const token = authHeader.split(' ')[1];
        if(!token)
            return res.status(401).json({message:"Acceso denegado!"});
        else {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'secretKey') as IPayload;
        //console.log(payload);
        }
        //req.session.user_id = payload._rol;
        //req.userdId = payload._id;
        
        next();

    } catch(error) {
        return res.status(401).json({message: 'Token invalido!'});
    }
	
}