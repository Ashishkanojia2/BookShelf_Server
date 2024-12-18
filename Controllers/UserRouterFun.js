import { usermodule } from "../models/userModel.js";
import {
  responseErrorSender,
  responseSender,
} from "../ResponseSender/responseSender.js";
import { otpGenerator } from "../utils/otpGenerator.js";
import { sendMail } from "../utils/sendMail.js";
import { sendToken } from "../utils/SendToken.js";
import fs from "fs";

import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/Cloudinary.js";

export const home_route = async (req, res) => {
  res.send("This is from Controller userRouter funciton ");
};

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, address, avatar } = req.body;

    let user = await usermodule.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "user is already exists" });
    }

    const otp = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    const otp_expire = new Date(Date.now() + 5 * 60 * 10000);

    const data = await usermodule.create({
      name,
      email,
      password,
      phone,
      address,
      otp,
      otp_expire,
      avatar,
    });
    const sendmailMessage = ` BOOK SELLING APPLICATION selling your old book in our application for best price
    Your Verification OTP is:  ${otp}  `;
    await sendMail(email, "Verify Your Account", sendmailMessage);
    sendToken(res, 200, data, "Token Message");
  } catch (error) {
    console.log("This error is come from regster router", error);
  }
};

export const verify = async (req, res) => {
  try {
    const user = await usermodule.findById(req.user._id);
    const otp = Number(req.body.otp);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    if (!otp) {
      return res
        .status(400)
        .json({ success: false, message: "User code not found" });
    }

    if (user.otp !== otp || user.otp_expire < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP or it has expired" });
    }

    user.verified = true;
    user.otp = null;
    user.otp_expire = null;

    await user.save();
    sendToken(res, 200, user, "Account Verified");
  } catch (error) {
    res.status(404).json({
      success: false,
      message: `Catch Case verify --> ${error.message}`,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }

    const userdata = await usermodule.findOne({ email }).select("+password");

    if (!userdata) {
      return res
        .status(400)
        .json({ success: false, message: "User not Exists" });
    }

    const isMatch = await userdata.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials --> Password doesn't match",
      });
    }

    sendToken(res, 200, userdata, "Login Successful");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ` login route Catch Case --> ${error.message}`,
    });
  }
};
export const bookOwner = async (req, res) => {
  try {
    const { bookOwnerId } = req.body;
    if (!bookOwnerId) {
      return res
        .status(400)
        .json({ success: false, message: "Book Owner Not Found1" });
    }

    const userdata = await usermodule.findOne({ _id: bookOwnerId });

    if (!userdata) {
      return res
        .status(400)
        .json({ success: false, message: "User not Exists" });
    }

    responseSender(res, 200, true, "userFound", userdata);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ` login route Catch Case --> ${error.message}`,
    });
  }
};
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()) })
      .json({ success: true, message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ` Error while logout--> ${error.message}`,
    });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const user = await usermodule.findById(req.user._id);
    sendToken(res, 200, user, `Welcome back ${user.name}`);
  } catch (error) {
    responseErrorSender(res, 401, false, `user not found ${error.message}`);
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const userdata = await usermodule.findOne({ email });

    if (!userdata) {
      return responseErrorSender(
        res,
        401,
        false,
        "user not found while update password"
      );
    }
    const otpcode = otpGenerator();

    userdata.resetPasswordOTP = otpcode;
    userdata.resetPasswordOtpExpire = Date.now() + 10 * 60 * 1000; // opt valid up to 10 mint

    userdata.save();

    sendMail(
      email,
      "Forgot Password ",
      ` Here is your otp .Now don't be forgot it ${otpcode}`
    );

    responseSender(res, 200, true, "OTP send your Email");
  } catch (error) {
    responseErrorSender(res, 401, false, `error message ${error.message}`);
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { otp, newpassword } = req.body;

    const userdata = await usermodule
      .findOne({
        resetPasswordOTP: otp,
        resetPasswordOtpExpire: { $gt: Date.now() },
      })
      .select("+password");

    if (!userdata) {
      return responseErrorSender(
        res,
        401,
        false,
        "OTP Invalid  or has been Expired"
      );
    }

    userdata.resetPasswordOTP = null;
    userdata.resetPasswordOtpExpire = null;
    userdata.password = newpassword;
    await userdata.save();

    responseSender(res, 200, true, "Password Change Successfully ");
  } catch (error) {
    responseErrorSender(res, 401, false, `user not found ${error.message}`);
  }
};
export const updatePassword = async (req, res) => {
  try {
    const user = req.user;

    const { oldpassword, newpassword } = req.body;
    // Input validation
    if (!oldpassword || !newpassword) {
      return responseSender(
        res,
        400,
        false,
        "Please provide both oldPassword and newPassword."
      );
    }

    const userdata = await usermodule
      .findById({ _id: user._id })
      .select("+password");

    if (!userdata) {
      return responseErrorSender(
        res,
        401,
        false,
        "User not Found Try Again after some time!"
      );
    }

    const isCorrect = await userdata.comparePassword(oldpassword);
    if (!isCorrect) {
      return responseSender(res, 401, false, "passowrd is  incorrect");
    }

    userdata.password = newpassword;
    await userdata.save();

    responseSender(res, 200, true, "Password update Successfully ");
  } catch (error) {
    responseErrorSender(res, 401, false, `user not found ${error.message}`);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { name, gender, occupation, phone, address } = req.body;
    const avatar = req.file?.path;
    console.log(
      "******************** update profile from server side  *********************"
    );

    console.log(
      `name : ${name} , gender : ${gender} , occupation : ${occupation} , phone : ${phone} , address : ${address} `
    );
    console.log(`avatar : ${avatar}`);
    console.log(`req.file : ${req.file}`);

    const user = await usermodule.findById(req.user._id);
    if (!user) {
      return responseSender(res, 404, false, "User not found");
    }

    if (name) user.name = name;
    if (gender) user.gender = gender;
    if (occupation) user.occupation = occupation;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    if (avatar) {
      try {
        if (user.avatar?.public_id) {
          const responseForDelete = await deleteOnCloudinary(
            user.avatar.public_id
          );
        }
        const mycloud = await uploadOnCloudinary(avatar);

        user.avatar = {
          public_id: mycloud.public_id,
          url: mycloud.secure_url,
        };
      } catch (cloudinaryError) {
        console.error("Cloudinary Error1:", cloudinaryError);
        return res.status(500).json({
          success: false,
          message: `Cloudinary Error2: ${cloudinaryError.message}`,
        });
      }
    }

    await user.save();
    if (fs.existsSync(avatar)) {
      fs.unlinkSync(avatar);
    }

    responseSender(res, 200, true, `Profile update Successfully `, user);
  } catch (error) {
    responseErrorSender(
      res,
      401,
      false,
      `Error from updateprofile : ${error.message}`
    );
  }
};
