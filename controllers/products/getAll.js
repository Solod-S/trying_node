const { Product } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, perPage = 2 } = req.query;
  const skip = (page - 1) * perPage;

  const products = await Product.find({ owner: _id }, "", {
    skip,
    limit: Number(perPage),
  }).populate("owner", "_id name email");
  // populate("owner", "_id name email") вместо id вернет полную информацию о пользователе (первый аргумент по чему и где ищем, второй какие данные вернуть)
  // в схеме ==> owner: { type: Schema.Types.ObjectId, ref: "user" } пойдет в коллекцию
  // найдет пользователя и вернет нам данные
  res.status(200).json({
    status: "succes",
    code: 200,
    result: products,
  });
};

module.exports = getAll;

/* Product.find({ owner: _id }, "", {
    skip: 2,
    limit: 2,
  }) => первый аргумент это фильтр, второй что исключаем, настройки {skip === (страница - 1) * limit, limit === сколько эл на странице}
*/
