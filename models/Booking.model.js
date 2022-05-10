const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookingSchema = new Schema(
    {
        dateStart: {
            type: Date,
            required: true,
        },
        dateEnd: {
            type: Date,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },

        van: {
            type: Schema.Types.ObjectId,
            ref: "Van",
        },
    },
    {
        timestamps: true,
    }
);
module.exports = model("Booking", bookingSchema);
