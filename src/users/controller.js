const createError = require('http-errors');
const debug = require('debug')('app:module-users-controller');

const {UsersService} = require('./services');
const {Response} = require('../common/response');

module.exports.UsersController = {
    getUsers: async (req, res) => {
        try {
            let users = await UsersService.getAll()
            Response.sucess(res, 200, 'Lista de usuarios', users)
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },
    getuser: async (req, res) => {
        try {
            const {
                params : {id},
            } = req
            let user = await UsersService.getById(id);
            if(!user){
                Response.error(res, new createError.NotFound)
            }else{
                Response.sucess(res, 200, `User ${id}`, user)
            }
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },
    createUser: async (req, res) => {
        try {
            const {body} = req            
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest())
            }else{
                const insertedId = await UsersService.create(body);
                Response.sucess(res, 201, 'usuario agregado', insertedId)
            }       
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },
    updateUser: async(req, res) => {
        try {
            const{body} = req
            const {
                params : {id},
            } = req
            if(!id){
                Response.error(res, new createError.BadRequest())
            }else{
                const updateDoc = await UsersService.update(id, body)
                Response.sucess(res, 200, `Usuario Actualizado ${id}`, updateDoc)
            }
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },

    deleteUser: async(req,res) =>{
        try {
            const{
                params : {id}
            } = req
            if(!id){
                Response.error(res, new createError.BadRequest)
            }else{
                const deleteDoc = await UsersService.borrar(id)
                Response.sucess(res, 200, `Usuario borrado ${id}`, deleteDoc)
            }
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },    
    
}