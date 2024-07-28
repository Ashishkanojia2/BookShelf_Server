import express from "express";
import User from "./Routers/UserRouters.js";
import bookRouter from "./Routers/BookRouters.js";
export const app = express();
import cookieParser from "cookie-parser";

//YAHA PR USER ROUTER FILE KO IMPORT KENA HIA
// COOKIE PARSER KO BHEE IMPORT KRNA HAI
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/user", User);
app.use("/api/v1/book", bookRouter);
