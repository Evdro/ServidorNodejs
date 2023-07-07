const express = require('express');

const router = express.Router()
const {salesController} = require('./controller');

module.exports.SalesAPI = (app) => {
    router
    .get("/", salesController.getSales)
    .get("/:id", salesController.getSale)
    .post("/", salesController.createSale)
    .delete("/:id", salesController.deleteSale)
    .put("/:id", salesController.updateSale)

    app.use('/api/sales', router)
}