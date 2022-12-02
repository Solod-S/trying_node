const express = require("express");
const { products: ctrl } = require("../../controllers");
const { joiSchema, statusJoiSchema } = require("../../models/product");
const { validation, tryCatch } = require("../../middlewares");

const router = express.Router();
router.get("/", tryCatch(ctrl.getAll));
router.get("/:id", tryCatch(ctrl.getById));
router.post("/", validation(joiSchema), tryCatch(ctrl.add));
router.delete("/:id", tryCatch(ctrl.dell));
router.put("/:id", validation(joiSchema), tryCatch(ctrl.updateStatus));
router.patch(
  "/:id/status",
  validation(statusJoiSchema),
  tryCatch(ctrl.updateById)
);
module.exports = router;
