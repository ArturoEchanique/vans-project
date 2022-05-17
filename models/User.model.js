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
        userBookings: [
            {
                type: Schema.Types.ObjectId,
                ref: "Booking",
            },
        ],
        ownerBookings: [
            {
                type: Schema.Types.ObjectId,
                ref: "Booking",
            },
        ],
        favoriteVans: [
            {
                type: Schema.Types.ObjectId,
                ref: "Van",
                unique: true,
            },
        ],
        // banckthing: {
        //     type: String,
        //     required: true,
        // },
        role: {
            type: String,
            enum: ["ADMIN", "USER", "OWNER"],
            default: "USER",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("User", userSchema);
