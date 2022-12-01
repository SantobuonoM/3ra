import ContenedorMongoDb from "../contenedores/contenedorMongoDb.cjs";
import Carrito from "../managers/carritos.model.js";
import productosDao from "./indexDao.cjs"
class daoCarritoMongo extends ContenedorMongoDb {
  constructor() {
    super("carrito", productosDao, {
      products: [
        {
          title: { type: String, required: true },
          price: { type: Number, required: true },
          thumbnail: { type: String, required: true },
          id: { type: String, required: true },
        },
      ],
    });
  }
}

export default daoCarritoMongo;
