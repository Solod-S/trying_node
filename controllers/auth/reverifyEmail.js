const { User } = require("../../models");
const createError = require("http-errors");

const reverifyEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw createError(404, "missing required field email");
  }

  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    throw createError(404, "User not found");
  }

  const { verify, verifyToken } = user;

  if (verify) {
    throw createError(400, "Verification has already been passed");
  }

  // const mail = {
  //   to: email,
  //   subject: "подтверждения email",
  //   html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verifyToken}">Подтвердить email</a>`,
  // };

  // await sendEmail(mail);

  res.status(200).json({
    status: "succes",
    code: 200,
    message: {
      verifyLink: `http://localhost:3000/api/users/verify/${verifyToken}`,
    },
  });
};
module.exports = reverifyEmail;
