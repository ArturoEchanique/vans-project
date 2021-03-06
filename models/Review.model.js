const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        rating: {
            type: Number,
            default: 5,
            min: 0,
            max: 5,
        },
        reviewDate: {
            type: Date,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = model("Review", reviewSchema);
