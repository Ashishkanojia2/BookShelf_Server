import express from "express";
import User from "./Routers/UserRouters.js";
import bookRouter from "./Routers/BookRouters.js";
import feedbackRouter from "./Routers/FeedbackRouters.js";
export const app = express();
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors  from "cors"

//YAHA PR USER ROUTER FILE KO IMPORT KENA HIA
// COOKIE PARSER KO BHEE IMPORT KRNA HAI
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true, // FOR THIS TEMP FOLDER WILL CREATE AND PHOTO WILL BE STORE ON TEMPEORY BEASES
  })
);
app.use(cors());
app.use("/api/v1/user", User);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/feedback", feedbackRouter);
