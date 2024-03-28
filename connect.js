const config = require('./config');

// eslint-disable-next-line no-unused-vars
const { dbUrl } = config;

const { MongoClient } = require('mongodb');

const client = new MongoClient(config.dbUrl);

async function connect() {
  try {
    await client.connect();
    const db = client.db('burguer_queen'); // Reemplaza <burguer_queen> por el nombre del db
    console.log("conectada a la base de datos");
    return db;
  } catch (error) {
    console.error(error);
    //
  }
}


module.exports = { connect };
