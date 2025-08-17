import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: String
}, { timestamps: true });

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true

    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ["Jersey", "Shorts", "Socks", "Boots", "Ball", "Gloves", "Accessory"],
        required: true
    },
    team: String,
    stock: {
        XS: { type: Number, default: 0 },
        S: { type: Number, default: 0 },
        M: { type: Number, default: 0 },
        L: { type: Number, default: 0 },
        XL: { type: Number, default: 0 },
        XXL: { type: Number, default: 0 },
    },
    offer: {
        type: Number,
        default: 0
    },
    year: {
        type: String,
        default: 0
    },
    weight: String,
    images: [String],

    likedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    likesCount: {
        type: Number,
        default: 0
    },
    reviews: [reviewSchema],
    averageRating: {
        type: Number,
        default: 0
    },

    isFeatured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
