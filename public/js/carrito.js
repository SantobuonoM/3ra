import daoCarritoMongo from "../../daos/daoCarritoMongo.js";
import { User } from "../../managers/user.js";
import { transporter } from "../../helpers/transport.js";
import log4js from "log4js";
const logger = log4js.getLogger();
const createCart = async (req, res) => {
  try {
    const { uid } = req.params;
    //Chequeamos que el user exista:
    const user = await User.findOne({ _id: uid });
    if (!user) return res.json({ status: 404, msg: "Usuario no existe" });
    //Chequeamos que el usuario no tenga un carrito:
    const carrito = await daoCarritoMongo.getByUser(uid);
    //Si no existe lo creamos y le agregamos el producto:
    if (!carrito) {
      await daoCarritoMongo.save({ user: uid, products: [] });
    } else {
      return res.json({ status: 400, msg: "El usuario ya tiene un carrito" });
    }

    return res.json({ msg: "carrito creado con éxito." });
  } catch (error) {
    logger.warn(e.message);
    return res.json({ status: 500, msg: error.message });
  }
};

const getAllCarritos = async (req, res) => {
  try {
    const cartList = await daoCarritoMongo.getAll();
    return res.json(cartList);
  } catch (e) {
    logger.warn(e.message);
    return res.json({ error: e.message });
  }
};

const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    await daoCarritoMongo.deleteById(id);
    return res.json({ msg: "Carrito eliminado con éxito." });
  } catch (error) {
    logger.warn(e.message);
    return res.json({ status: 500, msg: error.message });
  }
};

const addProductCart = async (req, res) => {
  try {
    const { uid, product } = req.params;
    //Chequeamos que el user exista:
    const user = await User.findOne({ _id: uid });
    if (!user) return res.json({ status: 404, msg: "Usuario no existe" });
    //Chequeamos que el usuario no tenga un carrito:
    const carrito = await daoCarritoMongo.getByUser(uid);
    //Si no existe lo creamos y le agregamos el producto:
    if (!carrito) {
      await daoCarritoMongo.save({ user: uid, products: [product] });
    } else {
      //Si ya existe le agregamos solo el producto:
      carrito.products.push(product);
      await carrito.save();
    }

    return res.json({ msg: "Producto agregado con éxito" });
  } catch (e) {
    logger.warn(e.message);
  }
};

const getProductCart = async (req, res) => {
  console.log(req.sessionID);
  const uid = await User.findById(req.user._id).lean();

  try {
    const cart = await daoCarritoMongo.getProductCart(datosUsuario);
    return res.render("carrito", { carrito: cart.products, uid: uid });
  } catch (e) {
    logger.warn(e.message);
  }
};

const deleteProductCart = async (req, res) => {
  const { uid, product } = req.params;
  try {
    const cart = await daoCarritoMongo.deleteProductCart(uid, product);
    return res.json({ status: 200, msg: "OK", data: cart });
  } catch (e) {
    logger.warn(e.message);
  }
};

const buyProduct = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findOne({ _id: uid });
    const cart = await daoCarritoMongo.getProductCart(uid);
    if (cart.products.length === 0)
      return res.render("carrito", { msg: "No hay productos en tu carrito" });
    //MAIL AL ADMINISTRADOR:
    const mailOptions = {
      from: "Server <noreply@node.com>",
      to: `${process.env.EMAIL}`,
      subject: `Nueva order de compra de ${user.username} ${user.lastname}`,
      text: `${cart.products}`,
    };

    transporter.sendMail(mailOptions);

    return res.redirect("/exito");
  } catch (e) {
    logger.warn(e.message);
    return res.json({ status: 500, msg: e.message });
  }
};

export {
  createCart,
  deleteCart,
  getProductCart,
  addProductCart,
  deleteProductCart,
  getAllCarritos,
  buyProduct,
};
