const express = require('express');
const createErrors = require('http-errors');

const {Response} = require('../common/response');

module.exports.IndexAPI = (app) => {
    const router = express.Router()

    router.get("/", (req, res) => {
     const menu = {
        products: `https://${req.headers.host}/api/products`,
        Users: `https://${req.headers.host}/api/users`
     }
        Response.sucess(res, 200, "API Inventario", menu)
    })

    app.use("/", router);
}

module.exports.NotFoundAPI = (app) => {
    const router = express.Router()

    router.all("*",(req,res) => {
        Response.error(res, new createErrors.NotFound)
    })

    app.use("/", router)

}