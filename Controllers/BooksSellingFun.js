import { BookModel } from "../models/BookModel.js";
import { usermodule } from "../models/userModel.js";
import { responseSender } from "../ResponseSender/responseSender.js";

export const book_Home = (req, res) => {
  res.send("chl rha hai bhai book router");
};
export const register = async (req, res) => {
  try {
    const user = await usermodule.findById(req.user._id);
    console.log("here is a user", user);
    if (!user) {
      res.status(401).json({
        sucess: false,
        message: "user not exists while register books",
      });
    }

    const {
      b_name,
      b_MRP,
      b_sellingprice,
      b_author,
      b_categories,
      b_edition,
      b_desc,
      // b_seller_id,
    } = req.body;

    const bookdata = await BookModel.create({
      b_name,
      b_MRP,
      b_sellingprice,
      b_author,
      b_categories,
      b_edition,
      b_desc,
      b_seller_id: user._id,
    });

    let userdata = await usermodule.findOne({
      _id: user._id,
    });
    userdata.sellingbooks.push(bookdata._id);
    userdata.save();

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
export const getallbooks = async (req, res) => {
  try {
    const allData = await usermodule.find();
    console.log("can we Recived all books data ", user);
    if (!allData) {
      res.status(401).json({
        sucess: false,
        message: "We can't get books Data",
      });
    }
    res
      .status(200)
      .json({ success: true, message: "we got all book of data ", allData });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something is error in server while getting books data",
    });
    console.log("Something is error in server while getting books data", error);
  }
};
export const userBookData = async (req, res) => {
  try {
    const user = await usermodule.findById(req.user._id);
    console.log("here is a user", user);
    if (!user) {
      res.status(401).json({
        sucess: false,
        message: "user not exists while register books",
      });
    }

    const {
      b_name,
      b_MRP,
      b_sellingprice,
      b_author,
      b_categories,
      b_edition,
      b_desc,
      // b_seller_id,
    } = req.body;

    const bookdata = await BookModel.create({
      b_name,
      b_MRP,
      b_sellingprice,
      b_author,
      b_categories,
      b_edition,
      b_desc,
      b_seller_id: user._id,
    });

    let userdata = await usermodule.findOne({
      _id: user._id,
    });
    userdata.sellingbooks.push(bookdata._id);
    userdata.save();

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
