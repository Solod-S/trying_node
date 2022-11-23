const express = require("express");
const PORT = 3232;
const cors = require("cors");
const app = express();
const productRouter = require("./routes/api/products");
app.use(cors());
app.use(express.json());
// чтобы експрес принимал джейсоны
app.use("/api/products", productRouter);

app.listen(PORT, () =>
  console.log(`<<!!!>>Your server start at port: ${PORT}<<!!!>>`)
);
