const { Router } = require("express");
const express = require("express");
const router = express.Router();

router
  .get(`/books`, (res, req) => req.json({ books: [] }))

  .post("/books", (res, req) => req.json({ books: [1] }));

module.exports = { router };
