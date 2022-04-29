import mongoose from "mongoose";
const { Schema, model } = mongoose;
const productSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    brand: { type: String },
    imageUrl: { type: String },
    price: { type: Number },
    category: { type: String },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);
export default model("product", productSchema);
