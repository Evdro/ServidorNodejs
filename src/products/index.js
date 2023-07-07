const express = require('express');

//Router nos permite manejar las rutas de 
//nuestro modulo independiente a la aplicacion
const router = express.Router();
const {ProductsController} = require('./controller');


module.exports.ProductsAPI = (app) =>{
    //definicin de rutas
    router
        .get('/', ProductsController.getProducts)
        .get('/report', ProductsController.generateReport)
        .get('/:id', ProductsController.getProduct)
        .post('/', ProductsController.createProduct)
        .put('/:id', ProductsController.updateProducto)
        .delete('/:id', ProductsController.deleteProducto)
        
    //se agreaga app a router 
    //y concatena cada ruta necesaria dentro
    //de la aplicacion
    app.use('/api/products',router)
    
}