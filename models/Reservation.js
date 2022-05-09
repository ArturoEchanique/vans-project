const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reservationSchema = new Schema(
    {
        dateStart: {
            type: Date,
            unique: true,
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
         imageUrl: {
            type: String,
            required: [true, "La imagen es obligatoria"],
        },
        vans: {
            type: Schema.Types.ObjectId,
            ref: "Van",
        },
    },
    {
        timestamps: true,
    }
);
module.exports = model("Reservation", reservationSchema);
