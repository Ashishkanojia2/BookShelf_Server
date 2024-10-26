import express from "express";
import User from "./Routers/UserRouters.js";
import bookRouter from "./Routers/BookRouters.js";
import feedbackRouter from "./Routers/FeedbackRouters.js";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();
app.use(cookieParser());

//DON'T REMOVE THIS **************************************************
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    // origin: "*", 
    origin: "*", 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
app.use("/api/v1/user", User);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/feedback", feedbackRouter);
