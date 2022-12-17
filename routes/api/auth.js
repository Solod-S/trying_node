const express = require("express");

const { validation, tryCatch, auth, upLoad } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const {
  joiSignUpSchema,
  joiLogInSchema,
  joiReverifyEmailSchema,
} = require("../../models/user");
const router = express.Router();

router.post("/signup", validation(joiSignUpSchema), tryCatch(ctrl.signUp));
router.post("/signin", validation(joiLogInSchema), tryCatch(ctrl.signIn));
router.get("/logout", auth, tryCatch(ctrl.logOut));

router.patch(
  "/avatars",
  auth,
  upLoad.single("avatar"),
  tryCatch(ctrl.updateAvatar)
);
router.get("/current", auth, tryCatch(ctrl.getCurrent));
router.get("/verify/:verifyToken", tryCatch(ctrl.verifyEmail));
router.post(
  "/verify",
  validation(joiReverifyEmailSchema),
  tryCatch(ctrl.reverifyEmail)
);
module.exports = router;
