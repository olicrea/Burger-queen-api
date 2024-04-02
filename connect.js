const config = require('./config');
// eslint-disable-next-line no-unused-vars
const { dbUrl } = config;
const mongoose = require('mongoose');

//const { MongoClient } = require('mongodb');
//const client = new MongoClient(config.dbUrl);

async function connect() {
  try {
    await mongoose.connect(dbUrl);
    //const db = mongoose.db('burguer_queen'); // Reemplaza <burguer_queen> por el nombre del db
    console.log("conectada a la base de datos");
    return mongoose.connect.db;
  } catch (error) {
    console.error(error);
    //
  }
}
// O: documentación sobre connect mongoose-mongodb en nodejs: https://mongoosejs.com/docs/connections.html#multiple_connections

module.exports = { connect };
