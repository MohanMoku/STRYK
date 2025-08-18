import { errorHandler } from "../utils/error.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const addProduct = async (req, res, next) => {

    try {

        const newProduct = new Product({

            name: req.body.name,
            team: req.body.team,
            year: req.body.year,
            description: req.body.description,
            price: req.body.price,
            offer: req.body.offer,
            category: req.body.category,
            weight: req.body.weight,
            stock: req.body.stock,
            images: req.body.images,
            isFeatured: req.body.isFeatured,

        })

        await newProduct.save();

        res
            .status(201)
            .json({ message: "Product added successfully" });

    } catch (error) {
        next(errorHandler(500, error))
    }

}

export const getAllProductsToAdmin = async (req, res, next) => {

    try {

        const products = await Product.find().sort({ createdAt: -1 })

        res
            .status(200)
            .json({ products: products })

    } catch (error) {
        next(errorHandler(500, error))
    }

}

export const updateProduct = async (req, res, next) => {

    try {

        const updatedProduct = await Product.findByIdAndUpdate(
            req.query.id,
            { $set: req.body },
            { new: true }
        );

        res
            .status(200)
            .json({ message: "Updated Successfully" });

    } catch (error) {
        next(errorHandler(500, error))
    }

}

export const getThisProductById = async (req, res, next) => {

    try {

        const id = req.query.id;

        const product = await Product.findById(id)

        res
            .status(200)
            .json({ product: product })

    } catch (error) {
        next(errorHandler(500, "Server Error"))
    }

}

export const addLike = async (req, res, next) => {
    try {

        const { userId } = req.body;

        const { productId } = req.params;

        const product = await Product.findById(productId);
        const user = await User.findById(userId);

        if (!product || !user) {
            return res
                .status(404)
                .json({ message: "Product or User not found" });
        }

        const isLiked = product.likedBy.includes(userId);

        if (isLiked) {
            product.likedBy.pull(userId)
            product.likesCount -= 1
            user.likes.pull(productId)
        } else {
            product.likedBy.push(userId)
            product.likesCount += 1
            user.likes.push(productId)
        }

        await product.save()
        await user.save()

        res.json({
            message: isLiked ? "Product unliked" : "Product liked",
            liked: !isLiked
        });


    } catch (error) {
        next(errorHandler(500, error))
    }
}

export const searchQuery = async (req, res, next) => {

    try {

        const { query } = req.query;

        if (!query) return next(errorHandler(400, "Query is required"))

        const keywords = query.toLowerCase().split(/\s+/);

        const products = await Product.find().lean();

        const filtered = products.filter(p => {
            const name = p.name.toLowerCase();
            return keywords.some(k => name.includes(k)); // match any keyword
        });



        res
            .status(200)
            .json({ searchedProducts: filtered });

    } catch (error) {
        next(errorHandler(500, error))
    }

}

export const addReview = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { productId, rating, comment } = req.body;

        const product = await Product.findById(productId);
        const user = await User.findById(id);

        if (!product || !user) {
            return next(errorHandler(404, "Product or User not found"));
        }

        const totalRatings = product.reviews.reduce((sum, obj) => sum + obj.rating, 0);
        const preRate = totalRatings + parseInt(rating);

        product.averageRating = preRate / (product.reviews.length + 1);

        product.reviews.push({ user: id, rating, comment });

        await product.save();

        return res.status(200).json({ message: "Review added successfully" });
    } catch (error) {
        return next(errorHandler(500, error.message || "Server error"));
    }
};

export const reviewDetails = async (req, res, next) => {

    try {

        let responseNeedToSend = [];
        const { id } = req.query;
        const product = await Product.findById(id);
        if (!product) return next(errorHandler(404, "Product not found"))

        for (let review of product.reviews) {

            const user = await User.findById(review.user);
            if (!user) continue;

            const name = user.name;
            const dpUri = user.dpUri;
            const comment = review.comment;
            const rating = review.rating;

            responseNeedToSend.push({
                name: name,
                dpUri: dpUri,
                comment: comment,
                rating: rating
            })

        }

        res
            .status(200)
            .json({ reviewDetails: responseNeedToSend })

    } catch (error) {
        next(errorHandler(500, error))
    }

}