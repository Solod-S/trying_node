const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const productRouter = require("./routes/api/products");
const authRouter = require("./routes/api/auth");

const app = express();

// в внутренее окружение заносим параметры из .env

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
