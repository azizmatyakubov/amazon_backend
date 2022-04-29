import mongoose from "mongoose";

const {Schema, model} = mongoose


const reviewSchema = new Schema(
    {
        comment: {type: String, required: true},
        rate: {type: Number, required: true, max: 5}, 
        productId: {type: Schema.Types.ObjectId, required: treu},
    },
    {
        timestamps: true
    }
)

export default model(reviewSchema);