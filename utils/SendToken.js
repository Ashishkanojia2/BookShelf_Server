import jwt from "jsonwebtoken";

export const sendToken = (res, statusCode, userdata, message) => {
  const user = {
    _id: userdata._id,
    name: userdata.b_name,
    email: userdata.email,
    phone: userdata.phone,
    address: userdata.address,
    verified: userdata.verified,
    otp: userdata.otp,
  };

  const token = jwt.sign({ _id: userdata._id }, process.env.JWT_SECRET_KEY);

  res
    .status(statusCode)
    .cookie("token", token)
    .json({ success: true, message, user: user });
};
