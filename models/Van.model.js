const { Schema, model } = require("mongoose");

const coasterSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "El nombre es obligatorio"],
        },
        description: {
            type: String,
            required: [true, "La descripción es obligatoria"],
            minlength: [20, "La descripción debe tener min. 20 caracteres"],
        },

        imageUrl: {
            type: String,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "Renter",
        },
    },
    {
        timestamps: true,
    }
);

const Coaster = model("Coaster", coasterSchema);

module.exports = Coaster;
