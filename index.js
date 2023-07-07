const express = require('express');
const debug = require("debug")("app:main");

//ctrl+shift+h para buscar el archivo config y la ruta 
//se ponga sola en require
const {Config} = require('./src/config/index') 
const { ProductsAPI } = require('./src/products/index');
const {UsersAPI} = require('./src/users/index');
const { SalesAPI } = require('./src/sales');
const {IndexAPI, NotFoundAPI} = require('./src/index');


const app = express();

app.use(express.json())  // aqui se reciben datos en el cuerpo de la peticion que se nos da

//modulos
IndexAPI(app)
ProductsAPI(app);
UsersAPI(app);
SalesAPI(app);
NotFoundAPI(app)

app.listen(Config.port, () => {
    debug(`Servidor escuchando en el puerto ${Config.port}`)
})

