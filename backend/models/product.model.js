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
    stock: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        enum: ["Jersey", "Shorts", "Socks", "Boots", "Ball", "Gloves", "Accessory"],
        required: true
    },
    team: String,
    size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL"]
    },
    color: String,
    material: String,
    brand: String,
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

    // Reviews & Ratings
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
