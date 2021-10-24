import { Router } from 'express'
import fs from 'fs'

const router = Router();

class Contenedor {
    constructor(nombreArchivo){
        this.ruta = nombreArchivo;
    }

    async getAll(){
        try{
            const contenido = await fs.promises.readFile(this.ruta, 'utf-8');
            return JSON.parse(contenido);

        }
        catch(error){
            await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2));
            const contenido = await fs.promises.readFile(this.ruta, 'utf-8');
            console.log('ERROR' + error);
            return JSON.parse(contenido);
        }
    } 

    async save(producto){
        let valores = await this.getAll();
        let id = 1;
        if(!valores){
            valores = [];
        }
        else{
            if(valores.length > 0){
                const idList = valores.map(element => element.id);
                id = Math.max(...idList)+1;
            }
        }

        producto["id"] = id;
        valores.push(producto);

        try{
            await fs.promises.writeFile(this.ruta, JSON.stringify(valores, null, 2));
            return id;

        }
        catch(error){
            console.log('ERROR' + error);
            return null;
        }


    }

    async getById(id){
        try{
            const valores = await this.getAll();
            const resultado = valores.find(element => element.id === id);
            return resultado;
        }
        catch(error){
            console.log('ERROR ' + error);
            return null;
        }
    }

    async findIndex(id){
        try{
            let valores = await this.getAll();
            let resultIndex = valores.findIndex(elem => elem.id ===id);
            return resultIndex;
        }
        catch(error){
            console.log('ERROR ' + error);
            return null;
        }
    }

    async deleteByID(id){
        const valores = await this.getAll();
        const indiceAEliminar = await this.findIndex(id);
        if(indiceAEliminar >-1){
            valores.splice(indiceAEliminar,1);
            const aux = await this.saveValues(valores);
            if(aux){
                console.log('Id eliminado: ' + id);
            }
            else{
                console.log('No existe el id: ' + id);
            }
        }
    }

    async saveValues(valores){
        try{
            await fs.promises.writeFile(this.file,JSON.stringify(valores,null,2));
            return true;
        }
        catch(error){
            console.log('ERROR' + error);
            return false;
        }
    }   

    async deleteAll(){
        try{
            await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2));
        }
        catch(error){
            console.log('ERROR ' + error);
            return null;
        }
    }

    async modifyProduct(producto){
        let valores = await this.getAll()
        let index = await this.findIndex(producto.id)
        valores[index] = producto
        let resultado = await this.saveValues(valores)
        return resultado
    }

}

router.get('/productos', async (req, res) => {
    const valores = await db.getAll()
    res.send(valores)
})

router.get('/productos/:id', async (req, res) => {
    let {id} = req.params
    id = Number(id)
    const resultado = await db.getById(id)
    
    if(!resultado){
        return res.json({error: 'producto no encontrado'})
    }
    else{
        return res.json(resultado)
    }
})

router.get('/productoRandom', async (req, res) => {
    const valores = await db.getAll()
    const random = valores[Math.floor(Math.random() * valores.length)]
    res.send(random)
})

router.post('/productos', async (req, res) => {
    let {nombre, precio, imagen} = req.body
    let id = await db.save({nombre, precio, imagen})
    res.status(200).json(nombre, precio, imagen, id)
})

router.put('/productos/:id', async (req, res) => {
    let {nombre, precio, imagen} = req.body
    let {id} = req.params
    let nuevoProducto = await db.getById(Number(id))
    nuevoProducto["nombre"] = nombre
    nuevoProducto["precio"] = precio
    nuevoProducto["imagen"] = imagen
    let result = await db.modifyProduct(nuevoProducto)
    if(result){
        res.status(200).json(`Se modifico el producto con id ${id} exitosamente`)
    }
    else{
        res.status(200).json(`error`)
    }
    

})

router.delete('/productos/:id', async (req, res) =>{
    let {id} = req.params
    let result = await db.deleteByID(Number(id))
    if(result){
        res.status(200).json(`Se elimino el producto con id ${id} exitosamente`)
    }
    else{
        res.status(200).json('Error al eliminar el producto.')
    }
})


const db = new Contenedor('./productos.txt')

export const routerProductos = router