import User from "../models/user.model.js"
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