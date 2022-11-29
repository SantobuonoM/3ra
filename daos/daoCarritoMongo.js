import ContenedorMongoDb from "../contenedores/contenedorMongoDb.cjs";
import Carrito from "../managers/carritos.model.js";

class daoCarritoMongo extends ContenedorMongoDb {
  constructor() {
    super(Carrito);
  }
  async getProductCart(uid) {
    try {
      const carrito = await Carrito.get({ user: uid })
        .populate("products")
        .lean();
      if (!carrito) throw new Error("Carrito no encontrado");
      return carrito;
    } catch (e) {
      console.log(e);
    }
  }
  async deleteProductCart(uid, product) {
    try {
      const carrito = await Carrito.et({ user: uid }).populate("products");
      if (!carrito) throw new Error("Carrito no encontrado");
      const newCarrito = carrito.products.filter(
        (p) => p._id.toString() !== product.toString()
      );
      carrito.products = newCarrito;
      return await carrito.save();
    } catch (e) {
      console.log(e);
    }
  }
}

export default daoCarritoMongo;
