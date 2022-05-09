const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        reservations: [{
            type: Schema.Types.ObjectId,
            ref: "Reservation",
        }],
    },
    {
        timestamps: true,
    }
);

module.exports = model("User", userSchema);