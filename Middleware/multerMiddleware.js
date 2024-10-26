import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
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

// console.log("multer upload", upload);

export default upload;
