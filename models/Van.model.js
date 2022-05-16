const { Schema, model } = require("mongoose");

const vanSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
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
            type: [String],
        },
        dayPrice: {
            type: Number,
            required: true,
        },
        solarPower: {
            type: Boolean,
        },
        shower: {
            type: Boolean,
        },
        bathroom: {
            type: Boolean,
        },
        maxPassengers: {
            type: Number,
        },
        location: {
            type: {
                type: String
            },
            coordinates: [Number],
            // required: [true, "Please Provide a location"],
        },
        vanRating: {
            type: Number,
            default: 4,
            min: 0,
            max: 5,
        },
        reviews: [{
            type: Schema.Types.ObjectId,
            ref: "Review",
        }],
    },
    {
        timestamps: true,
    }
);
vanSchema.index({ location: '2dsphere' })

const Van = model("Van", vanSchema);

module.exports = Van;
