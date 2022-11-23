const { router } = require("./booksRouter");
const got = require("got-promise");
const express = require("express");
const morgan = require("morgan");

const app = express();

const PORT = 8801;
const weatherBaseUrl = "http://api.weatherbit.io/v2.0/current";
// got("google.com")
//   .then(function (res) {
//     console.log(res.body);
//   })
//   .catch(function (err) {
//     console.error(err);
//     console.log(err.response.body);
//   });

// got.post("google.com"); // => Promise
//?key=f5a1a09f37fa482d9822dc6cf7b9e5e2&lat=50.519630&lon=30.787088
app.get("/api/weather", async (req, res) => {
  try {
    // const response = await got(
    //   `api.weatherbit.io/v2.0/current?key=f5a1a09f37fa482d9822dc6cf7b9e5e2&lat=50.519630&lon=30.787088`
    // );
    // const response = await got(weatherBaseUrl, {
    //   key: "f5a1a09f37fa482d9822dc6cf7b9e5e2",
    //   lat: "50.51963",
    //   lon: "30.787088",
    // });
    const { body } = await got.get(
      "api.weatherbit.io/v2.0/current?key=f5a1a09f37fa482d9822dc6cf7b9e5e2&lat=50.519630&lon=30.787088"
    );
    // const redy = await body.json();
    console.log(body);
    return res.json({ response: body });
  } catch (error) {
    res.status(500).json({ messege: error.msg });
  }
});

app.use(router);
// рутер для масштабирования приложения гет запрос http://localhost:8081/books вернет массив, app.use("/api", router) => http://localhost:8081/api/books
app.use(morgan("tiny"));
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

//key f5a1a09f37fa482d9822dc6cf7b9e5e2
// https://www.weatherbit.io/account/dashboard
//http://api.weatherbit.io/v2.0/current?key=f5a1a09f37fa482d9822dc6cf7b9e5e2&lat=50.519630&lon=30.787088
