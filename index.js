import { config } from "dotenv";
import { app } from "./app.js";
import { databaseConnection } from "./DatabaseCollection/Database.js";
import cloudinary from "cloudinary";

const PORT = "4000";

config({ path: "./config.env" });
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
databaseConnection();
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
