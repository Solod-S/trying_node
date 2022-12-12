const { User } = require("../../models");

const logOut = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  const user = await User.findByIdAndUpdate(_id, { token: null });

  res
    .status(200)
    .json({ status: "success", code: 200, data: { name: user.name } });
};
module.exports = logOut;
