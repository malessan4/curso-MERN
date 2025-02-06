import { articulos } from "./datos/articulos.js";
import express from "express";

const app = express();

/*el .use son middleware */
app.use(express.json());

const PORT = 1234;

let articulosDevolver = articulos;

app.get('/api/articulos', (request, response) => {
    response.json(articulosDevolver);
})

app.get('/api/articulos/:id', (request, response) => {
    const id = Number(request.params.id)
    
    const articulo = articulosDevolver.find(articulo => articulo.id == id);

    if (articulo){
        response.json(articulo);
    }else{
        response.status(400).end();
    }
})

app.listen(PORT, () => {
    console.log("Servidor a la espera");
})