const express = require("express");
const { products: ctrl } = require("../../controllers");
const { productSchema } = require("../../schemas");
const { validation, tryCatch } = require("../../middlewares");

const router = express.Router();
router.get("/", tryCatch(ctrl.getAll));
router.get("/:id", tryCatch(ctrl.getById));
router.post("/", validation(productSchema), tryCatch(ctrl.add));
router.delete("/:id", tryCatch(ctrl.dell));
router.put("/:id", validation(productSchema), tryCatch(ctrl.updateById));
module.exports = router;
