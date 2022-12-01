import { Router } from "express";
import ContenedorMongoDb from "../contenedores/contenedorMongoDb.cjs";

export const carts_router = new Router();

carts_router.post("/", async (req, res) => {
  try {
    res.json(await ContenedorMongoDb.create());
  } catch (error) {
    console.log(error);
  }
});

carts_router.post("/:cart_id/products", async (req, res) => {
  let response = await ContenedorMongoDb.addProduct(
    req.params.cart_id,
    req.body.product_id
  );
  response.error ? res.status(400).json(response) : res.status(200).send();
});

carts_router.get("/:cart_id/products", async (req, res) => {
  let response = await ContenedorMongoDb.getProducts(req.params.cart_id);
  response.error
    ? res.status(400).json(response)
    : res.status(200).json(response);
});

carts_router.delete("/:cart_id/products/:product_id", async (req, res) => {
  let response = await ContenedorMongoDb.deleteProduct(
    req.params.cart_id,
    req.params.product_id
  );
  response.error ? res.status(400).json(response) : res.status(200).send();
});

carts_router.delete("/:cart_id", async (req, res) => {
  let response = await ContenedorMongoDb.clearProducts(req.params.cart_id);
  response.error ? res.status(400).json(response) : res.status(200).send();
});
