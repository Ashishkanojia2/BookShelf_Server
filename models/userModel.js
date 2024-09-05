import mongoose, { model, Types } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  name: {
    require: true,
    type: String,
  },
  email: {
    require: true,
    type: String,
    unique: true,
  },
  password: {
    require: true,
    type: String,
    minlength: ["8", "password must be altest 8 character"],
    select: false,
  },
  phone: {
    require: true,
    type: Number,
  },
  address: {
    require: true,
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  otp: Number,
  otp_expire: Date,
  resetPasswordOTP: Number,
  resetPasswordOtpExpire: Date,

  sellingbooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "books" }],
  feedBack: [{ type: mongoose.Schema.Types.ObjectId, ref: "feedback" }],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.log(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
export const usermodule = mongoose.model("user ", userSchema);
