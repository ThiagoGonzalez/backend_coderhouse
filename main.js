const express = require('express');
const fs = require('fs')

const PORT = 8080
const app = express()

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
        const valores = await this.getAll();
        const id = 1;
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

}

app.get('/',(peticion, respuesta) => {
    respuesta.send('hola desde express')
})

app.get('/productos', async (peticion, respuesta) => {
    const valores = await db.getAll()
    respuesta.send(valores)
})

app.get('/productoRandom', async (peticion, respuesta) => {
    const valores = await db.getAll()
    const random = valores[Math.floor(Math.random() * valores.length)]
    respuesta.send(random)
})

const server = app.listen(PORT, () => {
    console.log(`ya estoy conectado al puerto ${server.address().port}`)
})

server.on('error', () => {
    console.log('hubo un error...')
    console.log(error)
})

const db = new Contenedor('./productos.txt')

module.exports = Contenedor