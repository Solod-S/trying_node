const express = require("express");
const products = require("./products");
const fs = require("fs").promises;
const cors = require("cors");
const moment = require("moment");
const PORT = 8082;
const app = express();
// app.set("response json", 111);
app.use(async (req, res, next) => {
  const { method, url } = req;
  const data = moment().format("DD.MM.YYYY_HH:mm:ss");
  await fs.appendFile("app.log", `\n${method} ${url} ${data}`);
  next();
});
app.use(cors());
// разрешает крос доменные запросы
app.get("/", (request, response) => {
  //   console.log(request.url);   //   console.log(request.method);  //   console.log(request.headers);
  response.send("<h2>Main page</h2>");
});
app.get("/contacts", (request, response) => {
  response.send("<h2>Contacts page<h2/>");
});
app.get("/products", (request, response) => {
  response.json(products);
  //   response.send(products);
});
app.get(`/handlebars`, (req, res) => {
  res.render(templateName, tamplateOption);
  // импортируемый шаблон + настройки {name: 'iphone', price: 400 } (чтобы вернуть разметку через шаблонизатор)
});
app.listen(PORT, () =>
  console.log(`<<!!!>>Your server start at port: ${PORT}<<!!!>>`)
);
