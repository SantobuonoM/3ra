import { response, Router } from "express";
import { productosDao, carritoDao } from "../daos/indexDao.cjs";
import { mensajeProducto } from "../utils/whatsapp.js";

export const carts_router = new Router();

carts_router.post("/", async (req, res) => {
  try {
    res.json(await carritoDao.create());
    res.redirect("/");
    console.log("¡Carrito creado!");
  } catch (error) {
    console.log(error);
  }
});

carts_router.post("/:cart_id/products", async (req, res) => {
  try {
    let response = await carritoDao.addProduct(
      req.params.cart_id,
      req.body.productos
    );
    mensajeProducto();
    res.json(response);
  } catch (error) {
    res.send(error);
  }
});

carts_router.get("/:cart_id/products", async (req, res) => {
  try {
    let response = await carritoDao.getProducts(req.params.cart_id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json(response);
  }
});

carts_router.delete("/:cart_id/products/:product_id", async (req, res) => {
  try {
    let response = await carritoDao.deleteProduct(
      req.params.cart_id,
      req.params.product_id
    );
    res.json(response);
  } catch (error) {
    res.send(error);
  }
});

carts_router.delete("/:cart_id", async (req, res) => {
  try {
    let response = await carritoDao.clearProducts(req.params.cart_id);
    res.json(response);
  } catch (error) {
    res.send(error);
  }
});
