const express = require("express");
const morgan = require("morgan");
//стороний мидлвейр чтобы логать запросы
const app = express();

const PORT = 8801;

app.use(morgan("tiny"));
// НЕ СТАНДАРТНЫЙ мидлвар логирование
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.originalUrl} ${new Date().toISOString()}`);
//   next();
// });
// СТАНДАРТНЫЙ мидлвар логирование
app.use(express.json());
//мидлвар парсер джейсона от клиент (если в контент тайп джейсон, то мы его запарсим и поместим в боди реквеста)
app.use(express.urlencoded({ extended: true }));
//мидлвар парсер форм из штмл
app.use(express.static("./public"));
//http://localhost:8081/file.txt
//мидлвар позволяет сделать какую то директорию на нашем сервере публичной
app.get("/", (req, res) => {
  res.send("Hello World!");
  //   res.sendStatus(200);
});
// app метод get, первый параметр url + функция обработки запросов
app.post("/", (req, res) => {
  console.log(req.body);
  if (!req.body.goit) {
    return res.status(400).json({ status: "goit parametr is required" });
  }
  // валидация запроса
  res.json({ java: "Post request!!!", body: req.body });
  // перегоняет в джейсон
});
app.delete("/", (req, res) => {
  res.json({ java: "Delete request" });
});

app.patch("/google", (req, res) => {
  res.redirect("https://www.google.com");
  //редирект
});
// ответ на запрос если он не замачился на предведущии запросы (пофиг какой)
app.listen(8081, (error) => {
  if (error) {
    console.error(`Error at server lounch `, error);
  }
  console.log(`Server started at port: ${PORT}`);
});

// const express = require("express");
// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
