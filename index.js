const fs = require("fs").promises;
const http = require("http");
//  1) подключаем модуль http
const PORT = 8081;
//  2) определяем порт сервера
// const requestHandler = (request, response) => {
//   console.log(request);
//   // response.writeHead(200, { "content-type": "text/html" });
//   response.writeHead(200, { "content-type": "text/json" });
//   // response.end(`<h1>Hello<h1/>`);
//   // или
//   // response.write(`<h1>Hello<h1/>`);
//   response.write(JSON.stringify({ a: 1, b: [] }));
//   response.end();
//   // если промежуточно нужно записывать
// };

const requestHandler = async (request, response) => {
  if (request.url === "/") {
    const settings = await fs.readFile("./package.json");
    response.writeHead(200, { "content-type": "text/json" });

    // response.write(JSON.stringify({ url: "home" }));
    response.write(settings);
    response.end();
  } else {
    response.writeHead(200, { "content-type": "text/json" });

    response.write(JSON.stringify({ url: "other" }));
    response.end();
  }
  // если промежуточно нужно записывать
};
// 3) делаем обработчик запросов (который работает с запросами и ответами)
const server = http.createServer(requestHandler);
// 4) определяем сервер с обработчиком запроса
server.listen(PORT, (error) => {
  if (error) {
    console.error(`Error at server lounch `, error);
  }
  console.log(`Server started at port: ${PORT}`);
});
//5) запускаем сервер и выделяем ему порт + функцию еррор ферст колбек
