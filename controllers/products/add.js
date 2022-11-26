const { addProduct } = require("../../models/products");

const add = async (req, res) => {
  const result = await addProduct(req.body);
  res.status(201).json({
    status: "succes",
    code: 201,
    result,
  });
};
module.exports = add;
