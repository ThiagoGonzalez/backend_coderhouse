//>> Consigna: Implementar programa que contenga una clase llamada Contenedor que reciba el nombre del archivo con el que va a trabajar e implemente los siguientes métodos:

//save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
//getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
//getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
//deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
//deleteAll(): void - Elimina todos los objetos presentes en el archivo.

const fs = require('fs')

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

const db = new Contenedor('./productos.txt');

const test = async() => {
    console.log(await db.getAll());
    //console.log(await db.save({title: 'remera', price: '100', thumbnail: ''}));
    //console.log(await db.save({title: 'pantalon', price: '200', thumbnail: ''}));
    //console.log(await db.save({title: 'zapatos', price: '300', thumbnail: ''}));
    //console.log('Get element by ID: '+JSON.stringify(await test.getById(1)));
    //console.log(await test.getAll());
    //await test.deleteById(2);
    //console.log(await test.getAll());
    //await test.deleteAll();
}

test();


