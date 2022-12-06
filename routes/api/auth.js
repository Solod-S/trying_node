const express = require("express");

const { validation, tryCatch } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiSignUpSchema, joiLogInSchema } = require("../../models/user");
const router = express.Router();

router.post("/signup", validation(joiSignUpSchema), tryCatch(ctrl.signUp));
router.post("/signin", validation(joiLogInSchema), tryCatch(ctrl.signIn));
module.exports = router;
