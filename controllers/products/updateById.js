const { updateProduct } = require("../../models/products");
const createError = require("http-errors");

const updateById = async (req, res) => {
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
};

module.exports = updateById;
