const { User } = require("../../models");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw createError(401, `Email or password is wrong`);
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = signUp;
// не через класс
//
// const bcrypt = require("bcryptjs");

// const signUp = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw createError(401, `User with ${email} not found`);
//   }
//   const passCompare = bcrypt.compareSync(password, user.password);
//   if (!passCompare) {
//     throw createError(401, `The password is incorrect`);
//   }
// };
