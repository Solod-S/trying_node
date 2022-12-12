const express = require("express");

const { validation, tryCatch, auth, upLoad } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiSignUpSchema, joiLogInSchema } = require("../../models/user");
const router = express.Router();

router.post("/signup", validation(joiSignUpSchema), tryCatch(ctrl.signUp));
router.post("/signin", validation(joiLogInSchema), tryCatch(ctrl.signIn));
router.get("/logout", auth, tryCatch(ctrl.logOut));

router.get("/current", auth, tryCatch(ctrl.getCurrent));
router.patch(
  "/avatars",
  auth,
  upLoad.single("avatar"),
  tryCatch(ctrl.updateAvatar)
);
module.exports = router;
