import { BookModel } from "../models/BookModel.js";
import { usermodule } from "../models/userModel.js";
import {
  responseErrorSender,
  responseSender,
} from "../ResponseSender/responseSender.js";
import cloudinary from "cloudinary";
import fs from "fs";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

export const book_Home = (req, res) => {
  res.send("chl rha hai bhai book router");
};

export const register = async (req, res) => {
  console.log("register route");
  console.log("req.files", req.files);
  console.log("req.body", req.body);
  try {
    console.log("register route");
    console.log("req.files", req.files); // Ensure files are here

    const productImages = [];
    const user = await usermodule.findById(req.user._id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist while registering books",
      });
    }

    const images = req.files; // Use req.files directly, since multer handles it

    if (!images || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images provided.",
      });
    }

    const {
      b_name,
      b_MRP,
      b_desc,
      b_sellingprice,
      b_author,
      b_categorie,
      b_edition,
    } = req.body;

    for (const image of images) {
      const tempFilePath = image.path; // Use the multer-assigned path
      const uploadResult = await uploadOnCloudinary(tempFilePath);

      productImages.push({
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      });

      fs.unlinkSync(tempFilePath); // Remove temporary local file after upload
    }

    const bookdata = await BookModel.create({
      b_name,
      b_MRP,
      b_desc,
      b_sellingprice,
      b_author,
      b_categorie,
      b_edition,
      b_seller_id: user._id,
      images: productImages,
    });

    user.sellingbooks.push(bookdata._id);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Book registered successfully",
      bookdata,
    });
  } catch (error) {
    console.log("Error while registering book:", error);
    res.status(500).json({
      success: false,
      message: "Server error while registering book",
    });
  }
};
// export const register_coverImage = async (req, res) => {
//   console.log("req.file", req.file);
//   // console.log("req.body", req.body);
//   try {
//     const images = req.file;

//     if (!images || images.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No images provided.",
//       });
//     }

//     const tempFilePath = images.path;
//     const uploadResult = await uploadOnCloudinary(tempFilePath);
//     const iamgeData = {
//       public_id: uploadResult.public_id,
//       url: uploadResult.secure_url,
//     };

//     fs.unlinkSync(tempFilePath);

//     const bookdata = await BookModel.create({
//       b_coverPageImage: iamgeData,
//     });
//     res.status(200).json({
//       success: true,
//       message: "Book Cover Image uploaded successfully",
//       bookdata,
//     });
//   } catch (error) {
//     console.log("Error while Uploading cover Image:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error Uploading cover Image",
//     });
//   }
// };

export const getallData = async (req, res) => {
  try {
    const allbooks = await BookModel.find();
    // console.log("here is a user", user);
    if (!allbooks) {
      res.status(401).json({
        sucess: false,
        message: "can't get allbooks data",
      });
    }
    res
      .status(200)
      .json({ success: true, message: " we got all allbooks data", allbooks });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something is error while getting book",
    });
    console.log(" error getting book", error);
  }
};
export const bookphoto = async (req, res) => {
  try {
    const images = req.files?.images.tempFilePath;
    console.log("book ki image me kya mil raha hai ", images);
  } catch (error) {
    responseErrorSender(res, 401, false, error);
    console.log(" error getting book", error);
  }
};

export const user_DeleteBook = async (req, res) => {
  try {
    const bookid = req.params;
    const userId = req.user._id;

    const userdata = await usermodule.findById(userId);

    if (!userdata) {
      return responseSender(res, 401, false, "User not found");
    }

    console.log("User data before deletion:", userdata);

    console.log("@#$", typeof bookid);
    console.log("@#$12233", bookid.bookId);

    const bookIdString = String(bookid.bookId);

    const updatedSellingBooks = userdata.sellingbooks.filter((item) => {
      console.log("Comparing:", String(item), "with", bookIdString);
      return String(item) !== bookIdString;
    });

    const deletebookfromBookData = await BookModel.findByIdAndDelete(
      bookIdString
    );
    console.log("deletebookfromBookData", deletebookfromBookData);

    userdata.sellingbooks = updatedSellingBooks;
    await userdata.save();

    return responseSender(res, 200, true, "Book deleted successfully");
  } catch (error) {
    console.log("Error in deleting book:", error);
    return responseSender(
      res,
      500,
      false,
      "Server error occurred while deleting book"
    );
  }
};

// drop one plan In this plan i just crate a route for upload bookcover image  and the main reason is every this is mashup in register route
//so in drop my plan
