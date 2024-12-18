import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  b_name: {
    type: String,
    require: true,
  },
  b_desc: {
    type: String,
    require: true,
  },
  b_MRP: {
    type: Number,
    require: true,
  },
  b_sellingprice: {
    type: Number,
    require: true,
  },
  b_author: {
    type: String,
    require: true,
  },
  b_edition: {
    type: String,
    require: true,
  },
  b_categorie: {
    type: String,
    require: true,
  },
  b_seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
});

export const BookModel = mongoose.model("books", bookSchema);
