const createError = require('http-errors');
const debug = require('debug')('app:module-products-controller');

const {ProductsService} = require('./services');
const {Response} = require('../common/response');

module.exports.ProductsController = {
    getProducts: async (req, res) => {
        try {
            let products = await ProductsService.getAll()
            Response.sucess(res, 200, 'Lista de productos', products)
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },
    getProduct: async (req, res) => {
        try {
            const {
                params : {id},
            } = req
            let product = await ProductsService.getById(id);
            if(!product){
                Response.error(res, new createError.NotFound)
            }else{
                Response.sucess(res, 200, `Producto ${id}`, product)
            }
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },
    createProduct: async (req, res) => {
        try {
            const {body} = req            
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest())
            }else{
                const insertedId = await ProductsService.create(body);
                Response.sucess(res, 201, 'Producto agregado', insertedId)
            }       
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },
    updateProducto: async(req, res) => {
        try {
            const{body} = req
            const {
                params : {id},
            } = req
            if(!id){
                Response.error(res, new createError.BadRequest())
            }else{
                const updateDoc = await ProductsService.update(id, body)
                Response.sucess(res, 200, `Producucto Actualizado ${id}`, updateDoc)
            }
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },

    deleteProducto: async(req,res) =>{
        try {
            const{
                params : {id}
            } = req
            if(!id){
                Response.error(res, new createError.BadRequest)
            }else{
                const deleteDoc = await ProductsService.borrar(id)
                Response.sucess(res, 200, `Producto borrado ${id}`, deleteDoc)
            }
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },

    generateReport: (req, res) => {
        try {
            ProductsService.generateReport('inventario', res)
        } catch (error) {
            debug(error)
            Response.error(res)
        }
    },
    
}