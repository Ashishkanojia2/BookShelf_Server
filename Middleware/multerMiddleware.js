import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/tmp");
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

export default upload;
///////////////////////////////////////////
/*
README 

in this multer code i face error when i upload sinlge photo or multile photo so i am using two different way to done
 this i am using diskstorage for uploaind single photo and use 
memory stoarge to uploading a multipl photo 
     */

/////////////////////////////////////////////



const M_storage = multer.memoryStorage(); // Store files in memory
const M_upload = multer({ M_storage });

// Export both single and multiple upload middlewares
// export const singleUpload = upload.single("avatar"); // For single file upload
export const multipleUpload = M_upload.array("images", 10); // For multiple files, with a max of 10 files
