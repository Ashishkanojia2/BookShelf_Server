import express from "express";
import { book_Home, getallbooks, register } from "../Controllers/BooksSellingFun.js";
import { isAuthenticated } from "../Middleware/auth.js";
const router = express();

router.route("/book").get(book_Home);

router.route("/register").post(isAuthenticated, register);
router.route("/getallbooks").get(getallbooks);

export default router;
