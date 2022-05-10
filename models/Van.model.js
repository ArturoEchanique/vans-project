const { Schema, model } = require("mongoose");

const vanSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
        },
        description: {
            type: String,
            required: [true, "Please Provide a description"],
            minlength: [4, "the description must be 4 characters long"],
        },
        imageUrl: {
            type: String,
        },
        dayPrice: {
            type: Number,
            required: true,
        },
        location: {
            type: {
                type: String
            },
            coordinates: [Number],
            // required: [true, "Please Provide a location"],
        },
    },
    {
        timestamps: true,
    }
);
vanSchema.index({ location: '2dsphere' })

const Van = model("Van", vanSchema);

module.exports = Van;
