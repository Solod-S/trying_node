const ws = new require("ws");

const wsServer = new ws.Server({ port: 5000 });

const users = [];

wsServer.on("connection", (newUser) => {
  users.push(newUser);
  newUser.on("message", (data) => {
    const message = JSON.parse(data);
    console.log(message);
    users.forEach((user) => {
      if (user !== newUser) {
        user.send(JSON.stringify(message));
      }
      // всем кроме того юзека который написал, отправляем это сообщение
    });
  });
  // обработчик событий на получение сообщений с фронтенда
});
// обработчик событий на включение севрева
