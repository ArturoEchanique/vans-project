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
            default: "https://i.stack.imgur.com/34AD2.jpg",
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
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("User", userSchema);
