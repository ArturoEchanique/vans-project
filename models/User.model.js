const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            default: "https://i.stack.imgur.com/34AD2.jpg",
        },
        tenantBookings: [
            {
                type: Schema.Types.ObjectId,
                ref: "Reservation",
            },
        ],
        LessorBooking: [
            {
                type: Schema.Types.ObjectId,
                ref: "Reservation",
            },
        ],
        // banckthing: {
        //     type: String,
        //     required: true,
        // },
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
