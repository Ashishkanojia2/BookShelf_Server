// import { config } from "dotenv";
// import { app } from "./app.js";
// import { databaseConnection } from "./DatabaseCollection/Database.js";
// import cloudinary from "cloudinary";
// const PORT = "4000";

// config({ path: "./config.env" });
// // YA PR DATABASR CONNNECTION VALI FILE KO CALL KRNA HAI
// console.log("Cloudinary Config:", {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
// });
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });
// databaseConnection();
// app.listen(PORT, () => console.log(`Server is running on ${PORT}`));


import { config } from "dotenv";
import { app } from "./app.js";
import { databaseConnection } from "./DatabaseCollection/Database.js";
import cloudinary from "cloudinary";

const PORT = "4000";

// Load environment variables
config({ path: "./config.env" });

console.log("Loaded environment variables:", {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUD_API_KEY,
});

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Connect to database and start server
databaseConnection();
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
