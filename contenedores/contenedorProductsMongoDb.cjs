const mongoose = require("mongoose");
const config = require("../config.cjs");
//const { productosDao } = require("../daos/indexDao.cjs");
/** inicializar conexion a db */
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);
console.log("conectado a la DB -> Productos");
class ContenedorProductsMongoDb {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  // Crea un carrito
  create = async (req) => {
    try {
      let doc = await this.collection.create(req);
      return doc;
    } catch (err) {
      return { error: "Producto no guardado" };
    }
  };

  // Trae todos los carritos
  getAll = async () => {
    try {
      const carts = await this.collection.find({});
      if (!carts) throw new Error("Productos no encontrados");
      return carts;
    } catch (err) {
      return { error: err };
    }
  };

  // Trae un carrito por id
  getById = async (product_id) => {
    try {
      const cart = await this.collection.findById(product_id);
      if (!cart) throw new Error("Producto no encontrado");
      return cart;
    } catch (err) {
      return { error: err };
    }
  };

  getProducts = async (product_id) => {
    try {
      const cart = await this.collection.findById(product_id);
      if (!cart) throw new Error("Producto no encontrado");
      return cart.products;
    } catch (err) {
      return { error: err };
    }
  };

  addProduct = async (cart_id, product_id) => {
    try {
      const cart = await this.collection.getById(cart_id);
      console.log(cart.products);

      if (!cart) throw new Error("Producto no encontrado");
      const product = await productosDao.getById(product_id);
      if (!product) throw new Error("Producto no encontrado");

      const product_index = cart.products.findIndex(
        (product) => product._id == product_id
      );
      console.log(product_index);
      if (product_index === -1) {
        delete product._doc.stock;
        await cart.products.push({
          ...product._doc,
          quantity: 1,
          id: product_id,
        });
        await cart.save();
      } else {
        console.log("ENTRÓ");
        if (product.stock < cart.products[product_index].quantity + 1)
          return { error: "Producto sin stock" };

        console.log("PRODUCTO", cart.products[product_index]);

        await this.collection.findByIdAndUpdate(cart_id, {
          $inc: { [`products.${product_index}.quantity`]: 1 },
        });
      }

      return true;
    } catch (err) {
      return { error: err };
    }
  };

  //Delete product from cart
  deleteProduct = async (product_id) => {
    try {
      await this.collection.findByIdAndRemove({ _id: product_id });
      return true;
    } catch (error) {
      return { error };
    }
  };

  clearProducts = async (product_id) => {
    try {
      const cart = await this.getById(product_id);
      if (!cart) throw new Error("Carrito no encontrado");

      await this.collection.findByIdAndUpdate(product_id);
      return true;
    } catch (err) {
      return { error: err };
    }
  };
}

module.exports = ContenedorProductsMongoDb;
