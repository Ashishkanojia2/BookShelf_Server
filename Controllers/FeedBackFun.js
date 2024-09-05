import { userFeedBackModule } from "../models/FeedBackModel.js";
import { usermodule } from "../models/userModel.js";
import {
  responseErrorSender,
  responseSender,
} from "../ResponseSender/responseSender.js";

export const checking = async (req, res) => {
  res.send("woking user feedback to admin Route is working");
};

export const sendFeedback = async (req, res) => {
  try {
    const userid = req.user._id;
    console.log(userid);

    const { topic, describe } = req.body;
    console.log("user ka feedback ye raha ", topic, describe);
    const feedback_data = await userFeedBackModule.create({
      topic,
      describe,
      userId: userid,
    });
    console.log("1212", feedback_data);
    let userdata = await usermodule.findOne({ _id: userid });
    userdata.feedBack.push(feedback_data._id);
    userdata.save();
    responseSender(res, 200, "true", feedback_data);
  } catch (error) {
    console.log("error occurred from feeback fun ", error);
    responseErrorSender(res, 401, "false", error);
  }
};
