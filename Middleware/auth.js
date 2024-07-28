import jwt from "jsonwebtoken";
import { usermodule } from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log("token",token);

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Login your Account" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await usermodule.findById(decode._id);

    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    next();
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Problem in isAuth Middleware",
      error: error.message,
    });
  }
};
