import { articulos } from "./datos/articulos.js";
import express from "express";

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

app.listen(PORT, () => {
    console.log("Servidor a la espera");
})