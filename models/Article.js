const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        content: {
            type: String,
            required: true
        },

        category: {
            type: String,
            default: ""
        },

        image: {
            type: String,
            default: ""
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        views: {
            type: Number,
            default: 0
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);