const { User } = require("../../models");
const path = require("path");
const fs = require("fs").promises;
const createError = require("http-errors");

const updateAvatar = async (req, res) => {
  const { path: tempPath, originalname } = req.file;
  const { _id } = req.user;
  const newName = `${_id}_${originalname}`;

  const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
  const resultPath = path.join(avatarsDir, newName);
  try {
    await fs.rename(tempPath, resultPath);
    // переносим файл из темпорари в продактс, указываем старый путь + новый путь
    const avatarURL = path.join("public", "avatars", newName);
    // без __dirname так как нам нужна только вторая часть пути (адресс будет другой)

    await User.findByIdAndUpdate(
      _id,
      { avatarURL },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "succes",
      code: 200,
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempPath);
    throw createError(401, "Not authorized");
  }
};

module.exports = updateAvatar;
