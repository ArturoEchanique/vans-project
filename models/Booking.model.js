const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookingSchema = new Schema(
    {
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        bookedVan: {
            type: Schema.Types.ObjectId,
            ref: "Van",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = model("Booking", bookingSchema);
