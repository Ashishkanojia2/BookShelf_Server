import express from "express";
import { isAuthenticated } from "../Middleware/auth.js";
import { checking, sendFeedback } from "../Controllers/FeedBackFun.js";

const router = express();
router.route("/checking").get(checking);
router.route("/sendFeedback").post(isAuthenticated,sendFeedback);

export default router;
