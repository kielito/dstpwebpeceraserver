import { Request, Response } from 'express';
import comentarioModel from '../models/comentarioModel';

class UserController {
    //CRUD
    public async list(req: Request, res: Response) {
        const comentarios = await comentarioModel.listar();        

        return res.json(comentarios);
    }

    public async find(req: Request, res: Response) {
        const { id } = req.params;
        const comentario = await comentarioModel.buscarId(id);
        if (comentario)
            return res.json(comentario);
    }

    public async add(req: Request, res: Response) {
        const comentario = req.body;                
        const result = await comentarioModel.crear(comentario);
        
        if (!result)
            return res.status(400).json({ message: "No se pudo crear el comentario" });
        else {
            return res.status(200).json({ message: "Comentario creado " });
        }        
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const encontro = await comentarioModel.buscarId(id);
        
        if (encontro) {
            const comentario = req.body;     
            const result = await comentarioModel.actualizar(comentario, id);
            if (result) {
                return res.status(200).json({ message: "Comentario actualizado correctamente" });
            }
            return res.status(400).json({ message: "No se pudo actualizar el comentario " });
        }
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
        const result = await comentarioModel.eliminar(id);
        return res.status(200).json({ message: "Se eliminó el comentario correctamente!" });
    }
    //FIN CRUD

    //METODO PARA CERRAR LA SESION
    public endSession(req: Request, res: Response) {
        req.session.user = {}; //Se borran los datos del usuarios guardados en la variable user
        req.session.auth = false; //Se pone autenticado en false
        req.session.destroy(() => console.log("Sesion finalizada")); //Metodo para destruir datos asociados a la sesion
        res.redirect("/");
    }
}

const userController = new UserController();
export default userController;