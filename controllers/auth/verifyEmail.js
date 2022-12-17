const { User } = require("../../models");
const createError = require("http-errors");

const verifyEmail = async (req, res) => {
  const { verifyToken } = req.params;

  const user = await User.findOne({
    verifyToken: verifyToken,
  });
  if (!user) {
    createError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: null });
  res.status(200).json({
    status: "succes",
    code: 200,
    message: "Verification successful",
  });
};
module.exports = verifyEmail;
