class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        console.log(`El nombre completo es: ${this.nombre} ${this.apellido}`)
    }

    addMascota(nuevaMascota){
        console.log(mascotas.push(nuevaMascota));
    }

    countMascotas(){
        mascotas.length;
    }

    addBook(nombreLibro, nombreAutor){
        const nuevoLibro = {name: nombreLibro, autor: nombreAutor};
        this.libros.push(nuevoLibro);
    }

    getBookNames(){
        return this.libros.map((libro) => libro.name);
    }
}

const libro1 = {name: 'harry potter y la piedra filosofal', autor: 'jk rowling'}
const libro2 = {name: 'harry potter y la camara secreta', autor: 'jk rowling'}

const mascotas = ['mascota1', 'mascota2']

const arrayLibros = [libro1, libro2]

const usuario = new Usuario('thiago','gonzalez', arrayLibros, mascotas)

usuario.getFullName();
console.log(usuario.mascotas);
usuario.addMascota('mascota3');
console.log(usuario.mascotas);
usuario.countMascotas();
console.log(usuario.libros);
usuario.addBook('la comunidad del anillo', 'tolkien');
console.log(usuario.libros);
console.log(usuario.getBookNames());