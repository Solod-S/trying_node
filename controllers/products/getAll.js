const { Product } = require("../../models");

const getAll = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({
    status: "succes",
    code: 200,
    result: products,
  });
};

module.exports = getAll;
