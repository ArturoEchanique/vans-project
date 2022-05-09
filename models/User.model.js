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
        imageUrl: {
            type: String,
            required: [true, "Please provide an image"],
        },
        reservations: [
            {
                type: Schema.Types.ObjectId,
                ref: "Reservation",
            },
        ],
        // banckthing: {
        //     type: String,
        //     required: true,
        // },
        vans: [
            {
                type: Schema.Types.ObjectId,
                ref: "Van",
            },
        ],
        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: 'USER'
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("User", userSchema);
