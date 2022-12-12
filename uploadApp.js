const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const { v4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// если пойдет Get запрос в конце которого будет разширение то ищи его в папке "public" (после убираем в объекте старт с этой папки)

const tempDir = path.join(__dirname, "temp");

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

const upLoad = multer({
  storage: multerConfig,
});
// мидлвар

const products = [];

app.get("/api/multer", async (req, res) => {
  res.status(200).json(products);
});

app.post("/api/multer", upLoad.single("image"), async (req, res) => {
  const { path: tempPath, originalname } = req.file;
  const productDir = path.join(__dirname, "public", "products");
  const resultPath = path.join(productDir, originalname);

  try {
    await fs.rename(tempPath, resultPath);
    // переносим файл из темпорари в продактс, указываем старый путь + новый путь
    const image = path.join( "products", originalname);
    // без __dirname так как нам нужна только вторая часть пути (адресс будет другой)
    const newProduct = {
      name: req.body.name,
      id: v4(),
      image,
    };
    products.push(newProduct);
    res.status(201).json({
      status: "success",
      code: 201,
      result: newProduct,
    });
  } catch (error) {
    await fs.unlink(tempPath);
    // если ошибка то удаляем файл
    throw new Error();
  }
});

const { PORT = 3000 } = process.env;

app.listen(PORT);
