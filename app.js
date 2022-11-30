// const express = require('express');
// const logger = require('morgan');
// const app = express();
// const sweetsRouter = require('./routes/sweets');
// const workerRouter = require('./routes/workers');

// app.use(express.json(), logger('dev'));

// app.use('/api/v1/sweets', sweetsRouter)
// app.use('/api/v1/workers', workerRouter)

// module.exports = app;
const DB_HOST =
  "mongodb+srv://Solik098:m9D8RugRwyoDsIbJ@cluster0.ivrife7.mongodb.net/online_shop?retryWrites=true&w=majority";
const mongoose = require("mongoose");
mongoose
  .connect(DB_HOST)
  .then(() => console.log(`Database connected`))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
    //закрыть все неиспользованные процессы
  });
