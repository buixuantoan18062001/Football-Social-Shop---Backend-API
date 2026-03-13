const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        description: {
            type: String
        },
        image: {
            type: String,
            default: ""
        },
        stock: {
            type: Number,
            default: 0
        },
        ratings: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                rating: {
                    type: Number,
                    min: 1,
                    max: 5
                },
            }
        ],
        likes: {
            type: Number,
            default: 0
        },

        views: {
            type: Number,
            default: 0
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);