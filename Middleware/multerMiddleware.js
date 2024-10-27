import multer from "multer";
// console.log("from multer file start");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Newpublic/temp");
  },
  filename: function (req, file, cb) {
    console.log(
      "inside the multer file , file me kya recicve ho raha hai",
      file
    );

    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
// console.log("from multer file end");
  
// console.log("multer upload", upload);

export default upload;

// import multer from "multer";
// import fs from "fs";
// import path from "path";

// // Function to get the current directory path
// const __dirname = path.dirname(new URL(import.meta.url).pathname);

// // Define the path for the temporary storage
// const tempDir = path.resolve(__dirname, '../public/temp'); // Adjust path if needed

// // Check if the directory exists, if not, create it
// if (!fs.existsSync(tempDir)) {
//   fs.mkdirSync(tempDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, tempDir); // Use the absolute path
//   },
//   filename: function (req, file, cb) {
//     console.log("Inside multer file, received file:", file);
//     cb(null, `${Date.now()}-${file.originalname}`); // Use template literals correctly
//   },
// });

// const upload = multer({ storage });

// export default upload;
