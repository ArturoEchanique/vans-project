const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const renterSchema = new Schema(
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
    },
    {
        timestamps: true,
    }
);
    ;

module.exports = model("Renter", renterSchema);
