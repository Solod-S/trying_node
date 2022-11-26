const { listProducts } = require("../../models/products");

const getAll = async (req, res) => {
  const products = await listProducts();
  res.status(200).json({
    status: "succes",
    code: 200,
    result: products,
  });
};

module.exports = getAll;
