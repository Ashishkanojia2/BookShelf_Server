import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
  topic: {
    require: true,
    type: String,
  },
  describe: {
    require: true,
    type: String,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

export const userFeedBackModule = mongoose.model("feedback", feedbackSchema);
