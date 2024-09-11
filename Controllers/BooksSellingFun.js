import { BookModel } from "../models/BookModel.js";
import { usermodule } from "../models/userModel.js";
import {
  responseErrorSender,
  responseSender,
} from "../ResponseSender/responseSender.js";
import cloudinary from "cloudinary";
import fs from "fs";

export const book_Home = (req, res) => {
  res.send("chl rha hai bhai book router");
};
export const register = async (req, res) => {
  console.log("register route");
  console.log("req.files", req.files);
  // useEffect(() => {
  //   console.log("req.files", req.files);
  // }, []);
  try {
    const productImages = [];
    const user = await usermodule.findById(req.user._id);
    console.log("here is a user", user);
    if (!user) {
      res.status(401).json({
        sucess: false,
        message: "user not exists while register books",
      });
    }
    console.log("req.files", req.files);
    const images = req.files?.images;
    console.log("$$$$$$$$$$$$$44", images);

    if (!images || images.length === 0) {
      return responseSender(res, 400, false, "No images provided12.");
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
    if (Array.isArray(images)) {
      // If the request contains multiple files
      for (const image of images) {
        const tempFilePath = image.tempFilePath;
        const uploadResult = await cloudinary.v2.uploader.upload(tempFilePath, {
          folder: "Product_Images_ashishDev",
        });
        productImages.push({
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        });

        // Optionally remove the temporary file after uploading
        fs.rmSync(tempFilePath, { recursive: true, force: true });
      }
    } else {
      // If only one file is uploaded
      const tempFilePath = images.tempFilePath;
      const uploadResult = await cloudinary.v2.uploader.upload(tempFilePath, {
        folder: "Product_Images_ashishDev",
      });
      productImages.push({
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      });

      // Remove the temporary file after uploading
      fs.rmSync(tempFilePath, { recursive: true, force: true });
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

    let userdata = await usermodule.findOne({
      _id: user._id,
    });
    userdata.sellingbooks.push(bookdata._id);
    // userdata.images.push(productImages);
    userdata.save();

    // Optionally remove the temp folder if empty
    const tempFolder = "./tmp"; // Change this to your temp folder path
    if (fs.existsSync(tempFolder) && fs.readdirSync(tempFolder).length === 0) {
      fs.rmSync(tempFolder, { recursive: true, force: true });
    }

    res
      .status(200)
      .json({ success: true, message: "book is registered ", bookdata });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something is error in server while registering book",
    });
    console.log("Something is error in server while registering book", error);
  }
};
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
