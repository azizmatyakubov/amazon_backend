import mongoose from "mongoose";
const { Schema, model } = mongoose;
const cartSchema = new Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  status: { type: String, enum: ["Active", "Paid"] },
  product: [{ type: mongoose.Types.ObjectId, ref: "product" }],
});
