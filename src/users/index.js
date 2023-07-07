const express = require('express');

//Router nos permite manejar las rutas de 
//nuestro modulo independiente a la aplicacion
const router = express.Router();
const {UsersController} = require('./controller');


module.exports.UsersAPI = (app) =>{
    //definicin de rutas
    router
        .get('/', UsersController.getUsers)        
        .get('/:id', UsersController.getuser)
        .post('/', UsersController.createUser)
        .put('/:id', UsersController.updateUser)
        .delete('/:id', UsersController.deleteUser)
        
    //se agreaga app a router 
    //y concatena cada ruta necesaria dentro
    //de la aplicacion
    app.use('/api/users',router)
    
}