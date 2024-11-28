import express from "express";
import {
  book_Home,
  bookphoto,
  getallData,
  register,
  user_DeleteBook,
} from "../Controllers/BooksSellingFun.js";
import { isAuthenticated } from "../Middleware/auth.js";
import { multipleUpload } from "../Middleware/multerMiddleware.js";
// multipleUpload
const router = express();

router.route("/book").get(book_Home);
router
  .route("/register")
  // .post(isAuthenticated, upload.array("images"), register);
  .post(isAuthenticated, multipleUpload, register);
router.route("/getallbooks").get(getallData);
router.route("/bookphoto").post(bookphoto);
router
  .route("/userDeleteBook/:bookId")
  .delete(isAuthenticated, user_DeleteBook);

export default router;
