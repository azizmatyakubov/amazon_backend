import mongoose from "mongoose"

const { Schema, model } = mongoose

const reviewSchema = new Schema(
  {
    comment: { type: String, required: true },
    rate: { type: Number, required: true, max: 5 },
    productId: { type: mongoose.Types.ObjectId, ref: "product", id: false, required: true },
  },
  { timestamps: true }
)

export default model("Review", reviewSchema)
