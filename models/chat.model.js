const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const chatSchema = new Schema(
    {
        owners: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
        booking: {
            type: Schema.Types.ObjectId,
            ref: "Booking",
        },
    },
    {
        timestamps: true,
    }
);
module.exports = model("Chat", chatSchema);
