import { Router, Request, Response } from 'express';
import {TokenValidation} from "../lib/verifyToken";
import articuloController from '../controller/articuloController'; //ruta relativa
import { validateRequestSchema } from '../lib/validation';
import { articuloSchema } from '../lib/articulo-schema';

class ArticuloRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{

		this.router.get('/',(req:Request,res:Response)=> {
            req.session.auth=false;
			req.session.user={};
            res.render("partials/signinForm");
        });   
              
        this.router.get('/listar',TokenValidation,articuloController.listar);		
		this.router.post('/agregarproducto',articuloSchema, validateRequestSchema,TokenValidation,articuloController.agregar);
		this.router.post('/editar',articuloSchema, validateRequestSchema,TokenValidation,articuloController.update);        
        this.router.delete('/eliminar/:id',TokenValidation,articuloController.delete);

    }	
}

const articuloRoutes = new ArticuloRoutes();
export default articuloRoutes.router;