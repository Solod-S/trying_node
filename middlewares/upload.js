const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
    // объект ошибки + путь
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    // объект ошибки + file.originalname === сохрани файл с его исходным именем
  },
  limits: {
    fileSize: 2048,
  },
  // ограничение не больше 2мб
});
// настройки мидлВара

const upLoad = multer({ storage: multerConfig });

module.exports = upLoad;

// примит картинку в временную папку
// оставит оригинальное имя
// установит ограничение на размер
// в req.file внесет информацию про картинку
