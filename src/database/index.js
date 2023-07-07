//aqui unicamente se trae MongoClient de la libreria mongodb
const { MongoClient } = require("mongodb");
const debug = require("debug")("app:module-database");
const {Config} = require('../config/index')

var connection = null;
module.exports.Database = (collection) => new Promise(async(res, rej)=> {
    //patron singleton
    try {        
        if(!connection){ // si no existe una conexion se crea una
            const client = new MongoClient(Config.mongoUri); //url de database  //se genera
            connection = await client.connect(); // nueva conexion
            debug('nueva conexion realizada con MongoDB Atlas')
        }
        debug('reutilizando conexion')
        //si ya existe una conexion se reutiliza se trae la base
        //de datos mediante esta conexion almacenandola en db
        const db = connection.db(Config.mongoDbName);//nombre database        
        res(db.collection(collection))
    } catch (error) {
        rej(error);
    }
});
