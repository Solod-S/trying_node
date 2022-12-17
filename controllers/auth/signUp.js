const { User } = require("../../models");
const createError = require("http-errors");
const gravatar = require("gravatar");
const uuid = require("uuid");
const { sendEmail } = require("../../utils");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const findedUser = await User.findOne({ email });
  if (findedUser) {
    throw createError(409, `User with ${email} already exist`);
  }

  const verifyToken = uuid.v4();

  const avatarURL = gravatar.url(email);
  const newUser = new User({ name, email, avatarURL, verifyToken });
  console.log(newUser);
  newUser.setPassword(password);
  await newUser.save();
  // const mail = {
  //   to: email,
  //   subject: "подтверждения email",
  //   html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verifyToken}">Подтвердить email</a>`,
  // };

  // await sendEmail(mail);

  res.status(201).json({
    status: "succes",
    code: 201,
    user: { name, email, avatarURL, verifyToken },
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
