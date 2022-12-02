const ContenedorMongoDb = require("../contenedores/contenedorMongoDb.cjs");
class daoCarritoMongo extends ContenedorMongoDb {
  constructor(collection, modelSchema) {
    super(collection, modelSchema);
  }
}

module.exports = daoCarritoMongo;
