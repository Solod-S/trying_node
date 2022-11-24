const express = require("express");

const {
  listProducts,
  // getProductById,
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
    res
      .status(500)
      .json({ status: "error", code: 500, messege: "Server error" });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    // const product = await getProductById();
  } catch (error) {}
  res.json({ message: "template message" });
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
