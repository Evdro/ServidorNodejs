//ayuda a traer las variables que estan en.env
require('dotenv').config(); 

module.exports.Config = {  // el nombre del objeto es Config

port: process.env.PORT, //aqui se trae la configuracion del puerto 
                       //que esta en el archivo .env
mongoUri: process.env.MONGO_URI,
mongoDbName: process.env.MONGO_DBNAME
};


