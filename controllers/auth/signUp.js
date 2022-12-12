const { User } = require("../../models");
const createError = require("http-errors");
const gravatar = require("gravatar");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const findUser = await User.findOne({ email });
  if (findUser) {
    throw createError(409, `User with ${email} already exist`);
  }

  const avatarURL = gravatar.url(email);
  const newUser = new User({ name, email, avatarURL });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: "succes",
    code: 201,
    user: { name, email, avatarURL },
  });
};

module.exports = signUp;

// не через класс
//
// const bcrypt = require("bcryptjs");
// const signUp = async (req, res) => {
//   const { name, email, password } = req.body;

//   console.log(req.body);
//   const findUser = await User.findOne({ email });
//   if (findUser) {
//     throw createError(409, `User with ${email} already exist`);
//   }
//   const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//   await User.create({ name, email, password: hashPassword });
//   res.status(201).json({
//     status: "succes",
//     code: 201,
//     user: { name, email },
//   });
// };
