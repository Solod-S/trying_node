const { Product } = require("../../models");
const createError = require("http-errors");

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await Product.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
    }
  );
  if (!result) {
    throw createError(404, `Product with id ${id} not found`);
  }
  res.status(200).json({
    status: "succes",
    code: 200,
    result,
  });
};

module.exports = updateStatus;
