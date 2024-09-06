import express from "express";
import {
  book_Home,
  bookphoto,
  getallData,
  register,
} from "../Controllers/BooksSellingFun.js";
import { isAuthenticated } from "../Middleware/auth.js";
const router = express();

router.route("/book").get(book_Home);

router.route("/register").post(isAuthenticated, register);
router.route("/getallbooks").get(getallData);
router.route("/bookphoto").post(bookphoto);

export default router;
