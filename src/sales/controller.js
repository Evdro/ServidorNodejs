const createError = require('http-errors');
const debug = require('debug')('app:module-sales-controller');

const {SalesService} = require('./services');
const {Response} = require('../common/response');

const {ProductsService} = require('../products/services');
const {UsersService} = require('../users/services');

module.exports.salesController = {

    getSales: async (req, res) => {
        try {
            let sales = await SalesService.getAll()
            Response.sucess(res, 200, 'Lista de productos', sales)
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },
    getSale: async (req, res) => {
        try {
            const {
                params : {id},
            } = req
            let sale = await SalesService.getById(id);
            if(!sale){
                Response.error(res, new createError.NotFound)
            }else{
                Response.sucess(res, 200, `Venta ${id}`, sale)
            }
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },
    createSale: async (req, res) => {
        try {
            const {body} = req            
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest())
            }else{
                const usuario = await UsersService.getById(body.user)
                const producto = await ProductsService.getById(body.product)

                if(!usuario || !producto || producto.cantidad <= body.cantidad){
                    Response.error(res, new createError.BadRequest("Venta no realizada"))
                }else{
                const insertedId = await SalesService.create(body);
                Response.sucess(res, 201, 'venta agregado', insertedId)
                }

            }       
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },
    updateSale: async(req, res) => {
        try {
            const{body} = req
            const {
                params : {id},
            } = req
            if(!id){
                Response.error(res, new createError.BadRequest())
            }else{
                const updateDoc = await SalesService.update(id, body)
                Response.sucess(res, 200, `Venta Actualizado ${id}`, updateDoc)
            }
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },

    deleteSale: async(req,res) =>{
        try {
            const{
                params : {id}
            } = req
            if(!id){
                Response.error(res, new createError.BadRequest)
            }else{
                const deleteDoc = await SalesService.borrar(id)
                Response.sucess(res, 200, `Venta borrado ${id}`, deleteDoc)
            }
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    }
}