import User from "../models/user.model.js"
import Product from "../models/product.model.js";
import { errorHandler } from "../utils/error.js"

export const allUsers = async (req, res, next) => {

    try {
        const users = await User.find().sort({ createdAt: -1 })
        const allUsersList = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
        })

        res
            .status(200)
            .json({ userList: allUsersList })

    } catch (error) {
        return next(errorHandler(500, "Server Error"))
    }

}

export const getUserByUser = async (req, res, next) => {

    try {

        const { id } = req.query

        if (req.user.id !== id) {
            return next(errorHandler(403, "You are not authorized to access this user"))
        }

        const user = await User.findById(id)

        const { password, ...rest } = user._doc;
        res
            .status(200)
            .json({ user: rest })
    } catch (error) {
        return next(errorHandler(404, "User not found"))
    }

}

export const deleteUser = async (req, res, next) => {

    try {

        const id = req.query.id;

        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res
            .status(200).
            json({ message: "User deleted successfully" })

    } catch (error) {
        return next(errorHandler(500, "Server Error"))
    }

}

export const updateUser = async (req, res, next) => {
    try {

        const updatedUser = await User.findByIdAndUpdate(
            req.query.id,
            { $set: req.body },
            { new: true }
        );

        res
            .status(200)
            .json(updatedUser);
    } catch (err) {
        return next(errorHandler(500, err.message))
    }
};

export const getLikedProducts = async (req, res, next) => {

    try {

        const { id } = req.user;

        const user = await User.findById(id)
            .populate({
                path: "likes",
                select: "_id name price images offer likedBy likesCount",
            })

        if (!user) {
            return next(errorHandler(404, "User not found"))
        }

        res
            .status(200)
            .json({
                likedProducts: user.likes
            });

    } catch (error) {
        return next(errorHandler(500, "Server Error"))
    }

}

export const addOrRemoveCart = async (req, res, next) => {
    try {

        const { id } = req.user;
        const { productId } = req.params;
        const user = await User.findById(id);
        const product = await Product.findById(productId);

        if (!user || !product) {
            return res
                .status(404)
                .json({ message: "User not found" });
        }

        const isInCart = user.cart.includes(productId);

        if (isInCart) {
            user.cart.pull(productId)
        } else {
            user.cart.push(productId)
        }

        await product.save()
        await user.save()

        res.json({
            message: isInCart ? "Product Removed from Cart" : "Product Added to Cart",
            inCart: !isInCart
        });

    } catch (error) {
        return next(errorHandler(500, "Server Error"))
    }
}

export const getCartProducts = async (req, res, next) => {

    try {

        const { id } = req.user;

        const user = await User.findById(id)
            .populate({
                path: "cart",
                select: "_id name price images offer likedBy likesCount",
            })

        if (!user) {
            return next(errorHandler(404, "User not found"))
        }

        res
            .status(200)
            .json({
                cartProducts: user.cart
            })

    } catch (error) {
        return next(errorHandler(500, "Server Error"))
    }

}
