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
            minlength: [20, "the description must be 20 characters long"],
        },
        imageUrl: {
            type: String,
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
