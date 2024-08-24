import { BookModel } from "../models/BookModel.js";
import { usermodule } from "../models/userModel.js";

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
