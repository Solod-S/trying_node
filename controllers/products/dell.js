const { removeProduct } = require("../../models/products");
const createError = require("http-errors");
const dell = async (req, res) => {
  const { id } = req.params;
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
};

module.exports = dell;
