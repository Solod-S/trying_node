const express = require("express");

const { products: ctrl } = require("../../controllers");
const { validation, tryCatch, auth } = require("../../middlewares");
const { joiSchema, statusJoiSchema } = require("../../models/product");

const router = express.Router();

router.get("/", auth, tryCatch(ctrl.getAll));
router.get("/:id", tryCatch(ctrl.getById));
router.post("/", auth, validation(joiSchema), tryCatch(ctrl.add));
router.delete("/:id", tryCatch(ctrl.dell));
router.put("/:id", validation(joiSchema), tryCatch(ctrl.updateStatus));
router.patch(
  "/:id/status",
  validation(statusJoiSchema),
  tryCatch(ctrl.updateById)
);
module.exports = router;
