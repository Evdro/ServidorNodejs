const {ObjectId} = require('mongodb');
const {Database} = require('../database/index');
const {ProductUtills} = require('./utils');
const {MongoClient} = require('mongodb');

const debug = require('debug')('app:module-services');

const COLLECTION = 'products';

//getAll trae todos los datos de la base de datos de productos
const getAll = async() => {
    const collection = await Database(COLLECTION) 
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION)
    //Mongodb el id lo establece con guion bajo al inicio
    return collection.findOne({_id: new ObjectId(id)})
}

const create = async (product) => {
    const collection = await Database(COLLECTION)
    //insterOne recibe los datos del producto
    let result = collection.insertOne(product)
    //insertedId nos devuelve el identificador del objeto agregado
    return result.insertedId
}

const update = async (id, updateDocument={}) => {
    const collection = await Database(COLLECTION);
    const filter = {_id: new ObjectId(id)}
    const updateQuery = { $set: {... updateDocument}};    
    try {
      const result = await collection.updateOne(filter, updateQuery);
      return result;
    } catch (error) {
      debug(error);
      throw new Error('Error al actualizar el documento');
    }
  }

    const borrar = async (id) => {
      const collection = await Database(COLLECTION)
      const query = {_id: new ObjectId(id)}
      const result = await collection.deleteOne(query) 
      return result
    }

  
const generateReport = async (name, res) => {
    let products = await getAll();
    ProductUtills.excelGenerator(products, name, res)
}

//update
//delete

module.exports.ProductsService = {
    getAll,
    getById,
    create,
    generateReport,
    update,
    borrar
}



