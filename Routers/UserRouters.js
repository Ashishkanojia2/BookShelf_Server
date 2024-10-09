import express from "express";
import {
  bookOwner,
  forgotPassword, getMyProfile,
  home_route,
  login,
  logout,
  register,
  resetPassword,
  updatePassword,
  updateProfile,
  verify
} from "../Controllers/UserRouterFun.js";
import { isAuthenticated } from "../Middleware/auth.js";
import upload from "../Middleware/multerMiddleware.js";
const router = express();

router.get("/", (req, res) => {
  res.send("router and server is working fine ");
});

router.route("/home").get(home_route);
router.route("/register").post(register);
router.route("/verify").post(isAuthenticated, verify);
// DONT USER isAUTH BEFORE THE LOGIN REOUTE IF IS USER IS NOT AUTHENTICATED THEN USER CAN'T BE LOGIN SO, DONT USE isAUTH
router.route("/login").post(login);
router.route("/bookOwner").post(bookOwner);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated, getMyProfile);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword").put(resetPassword);
router.route("/updatePassword").put(isAuthenticated, updatePassword);
router
  .route("/updateProfile")
  .put(isAuthenticated, upload.single("avatar"), updateProfile);

export default router;
