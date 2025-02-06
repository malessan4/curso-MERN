import { articulos } from "./datos/articulos.js";
import express from "express";
import { validarArticulo, validarParcial } from "./helpers/zod.js";

const app = express();

/*el .use son middleware */
app.use(express.json());

const PORT = 1234;

//creo esta variable para poder usar el import articulos
let articulosDevolver = articulos;

/*
app.get('/', (request, response) => {
    response.send("Hola gente!!")
})
 */

/*
// aca lo tiene en la raiz del programa
app.get('/', (request, response) => {
    response.json(articulosDevolver);
})
 */

app.get('/api/articulos', (request, response) => {
    response.json(articulosDevolver);
})

app.get('/api/articulos/:id', (request, response) => {
    const id = Number(request.params.id)
    
    const articulo = articulosDevolver.find(articulo => articulo.id == id);

    if (articulo){ //si existte el articulo devuelve json
        response.json(articulo);
    }else{ // sino existe tira el error
        response.status(400).end();
    }
})

app.delete('/api/articulos/:id', (request, response) => {
    const id = Number(request.params.id);
    articulosDevolver = articulosDevolver.filter(articulo => articulo.id != id);
    
    if (articulosDevolver){
        response.json(articulosDevolver)
    }
    else{
        response.status(400).end();
    }
})

app.post('/api/articulos', (request, response) =>{
    // con esta constante capturamos lo que nos envien en el cuerpo
    const articulo = validarArticulo(request.body);

    if (articulo.error){
        return response.status(400).json('Validacion incorrecta')
    }

    const nuevoArticulo = {
        ...articulo.data
    };

    //esto lo hace para insertar el nuevo articulo, los ... significa todo lo que tenga la variable
    articulosDevolver = [...articulosDevolver, nuevoArticulo];

    response.json(nuevoArticulo);
});

app.put('/api/articulo/:id', (request, response) =>{
    const id = Number(request.params.id);
    const articuloValidado = validarParcial(request.body);

    if (articulo.error){
        return response.status(400).json('Validacion Incorrecta')
    }

    const articuloIdice = articulosDevolver.findIndex(articulo => articulo.id == id);
// el findIndex al no encontrar tira -1

    if (articuloIdice == -1){
        return response.status(400).json ('Articulo no encontrado');
    }

    const nuevoArticulo = {
        ...articulosDevolver[articuloIdice],
        ...articuloValidado.data
    }

    articulosDevolver[articuloIdice] = nuevoArticulo;

    response.json(nuevoArticulo);
})


app.listen(PORT, () => {
    console.log("Servidor a la espera");
})