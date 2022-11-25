const express = require("express");

const {
  listProducts,
  getProductById,
  // removeProduct,
  // addProduct,
} = require("../../models/products");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await listProducts();
    res.json({
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
      const error = new Error(`Product with id ${id} not found`);
      error.status = 404;
      throw error;
      // res.status(404).json({
      //   status: "error",
      //   code: 404,
      //   messege: `Product with id ${id} not found`,
      // });
      // return;
    }
    res.json({
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
  res.json({ message: "template message" });
});

router.delete("/:id", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:id", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
