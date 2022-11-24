const express = require("express");
const { v4 } = require("uuid");
const products = require("../../data/products");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ status: "succes", code: 200, data: { result: products } });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const result = products.find((item) => item._id === Number(id));
  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      messege: `Product with id ${id} not fount`,
    });
  }
  res.json({ status: "succes", code: 200, data: { result: result } });
});

router.post("/", (req, res) => {
  console.log(req.body);
  const newProduct = { _id: v4(), ...req.body };
  console.log(newProduct);
  res.status(201).json({
    status: "succes",
    code: 201,
    data: { result: newProduct },
  });
});
module.exports = router;
