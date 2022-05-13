const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
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
