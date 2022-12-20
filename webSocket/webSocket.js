// const Ws = require("ws");
// const wss = new Ws();

// const wsServer = new wss.Server({ port: 5000 });
const ws = new require("ws");

const wsServer = new ws.Server({ port: 5000 });

const clients = [];

wsServer.on("connection", (newClient) => {
  clients.push(newClient);
  //   setInterval(() => {
  //     newClient.send("Добро пожаловать на наш сервер!");
  //   }, 3000);
  //   console.log("Новое подключение с фронтенда");
  clients.forEach((client) => {
    if (client !== newClient) {
      client.send("К нам подключидся новый пользователь");
    }
  });
});
// метод который вешает обработчик событий (название события + функция колл бекс, которая срабатывает при этом событии)
