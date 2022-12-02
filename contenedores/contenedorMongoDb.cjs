const mongoose = require("mongoose");
const config = require("../config.cjs");
const { productosDao } = require("../daos/indexDao.cjs");
/** inicializar conexion a db */
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);
console.log("conectado a la DB -> Carrito");
class ContenedorMongoDb {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  // Crea un carrito
  create = async () => {
    try {
      let doc = await this.collection.create({ products: [] });
      return doc._id;
    } catch (err) {
      return { error: "Carrito no guardado" };
    }
  };

  // Trae todos los carritos
  getAll = async () => {
    try {
      const carts = await this.collection.find({});
      if (!carts) throw new Error("Carritos no encontrados");
      return carts;
    } catch (err) {
      return { error: err };
    }
  };

  // Trae un carrito por id
  get = async (cart_id) => {
    try {
      const cart = await this.collection.findById(cart_id);
      if (!cart) throw new Error("Carrito no encontrado");
      return cart;
    } catch (err) {
      return { error: err };
    }
  };

  getProducts = async (cart_id) => {
    try {
      const cart = await this.collection.findById(cart_id);
      if (!cart) throw new Error("Carrito no encontrado");
      return cart.products;
    } catch (err) {
      return { error: err };
    }
  };

  addProduct = async (cart_id, req) => {
    try {
      const cart = await this.collection.findById(cart_id);
      const prod = req;
      if (!prod) {
        throw new Error("Parametros del body incorrectos");
      }
      cart.products.push(prod);
      cart.save();
      console.log(cart.products);
      console.log("¡Producto agregado!");
      return cart.products;
    } catch (error) {
      console.log(error);
    }
  };

  //Delete product from cart
  deleteProduct = async (cart_id, product_id) => {
    try {
      const cart = await this.collection.findById(cart_id);

      if (!cart) throw new Error("Carrito no encontrado");

      const product_index = cart.products.findIndex(
        (product) => product._id == product_id
      );
      if (product_index === -1) throw new Error("Producto no encontrado");

      await this.collection.findByIdAndUpdate(
        cart_id,
        { $pull: { products: { _id: product_id } } },
        { safe: true, multi: true }
      );
      return "producto borrado correctamente!";
    } catch (error) {
      return { error };
    }
  };

  clearProducts = async (cart_id) => {
    try {
      const cart = await this.collection.findById(cart_id);
      if (!cart) throw new Error("Carrito no encontrado");

      await this.collection.findByIdAndUpdate(cart_id, {
        $set: { products: [] },
      });
      return "Productos del carrito borrado!";
    } catch (error) {
      return error;
    }
  };
}

module.exports = ContenedorMongoDb;
