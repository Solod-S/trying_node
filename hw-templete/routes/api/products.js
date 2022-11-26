const express = require("express");
const createError = require("http-errors");
// удобно отослать ошибку
const Joi = require("joi");
const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0.01).required(),
});
const {
  listProducts,
  getProductById,
  updateProduct,
  removeProduct,
  addProduct,
} = require("../../models/products");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await listProducts();
    res.status(200).json({
      status: "succes",
      code: 200,
      result: products,
    });
  } catch (error) {
    next(error);
    // res
    //   .status(500)
    //   .json({ status: "error", code: 500, messege: "Server error" });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product) {
      throw createError(404, `Product with id ${id} not found`);
      // ----2й вариант
      // const error = new Error(`Product with id ${id} not found`);
      // error.status = 404;
      // throw error;
      // в app мидлвар с 4 параметрами обрабатывает ошибку
      // app.use((err, req, res, next) => {
      //   const { status = 500, message = "Server error" } = err;
      //   atres.stus(status).json({ message: message });
      // });
      // -----3й вариант
      // res.status(404).json({
      //   status: "error",
      //   code: 404,
      //   messege: `Product with id ${id} not found`,
      // });
      // return;
    }
    res.status(200).json({
      status: "succes",
      code: 200,
      result: product,
    });
  } catch (error) {
    next(error);
    // res
    //   .status(500)
    //   .json({ status: "error", code: 500, messege: "Server error" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await addProduct(req.body);
    res.status(201).json({
      status: "succes",
      code: 201,
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await removeProduct(id);
    if (!result) {
      throw createError(404, `Product with id ${id} not found`);
    }
    // res.status(204);
    res.status(201).json({
      status: "succes",
      massege: "Product deleted",
      code: 201,
      dellatedProduct: result,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { id } = req.params;
    console.log(req.body, "id");

    const result = await updateProduct(id, req.body);
    if (!result) {
      throw createError(404, `Product with id ${id} not found`);
    }
    res.status(200).json({
      status: "succes",
      code: 200,
      result,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
