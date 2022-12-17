const { Product } = require("../../models");
const createError = require("http-errors");
const getById = async (req, res) => {
  const { id } = req.params;

  // const product = await Product.findById(id);
  // поиск по совпадению
  const product = await Product.findOne({ _id: id });
  if (!product) {
    throw createError(404, `Product with id ${id} not found`);
  }
  res.status(200).json({
    status: "succes",
    code: 200,
    result: product,
  });
};

module.exports = getById;
