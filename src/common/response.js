const createError = require('http-errors');

//esta linea 
module.exports.Response = {
    sucess: (res, status = 200, message= "Ok", body = {}) => {
        res.status(status).json({message, body})
    },
    error: (res, error = null) => {
        const {statusCode, message} = error ? error: new createError.InternalServerError();
        res.status(statusCode).json({message})
    }
}