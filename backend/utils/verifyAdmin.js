import User from "../models/user.model.js"
import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyIsAdmin = async (req, res, next) => {

    const token = req.cookies.token_check;
    let userId = null;

    if (!token)
        return next(errorHandler(403, "User Not authenticated"))
    // .status(403)
    // .json({ error: "User Not authenticated" })

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        if (err)
            return next(errorHandler(401, "User not Intereseted"))
        // .status(401)
        // .json({ error: err })
        userId = user.id;
    });


    const user = await User.findById(userId);
    if (!user)
        return next(errorHandler(404, "User Not Found"))
    // .status(404)
    // .json({ error: "User not found" })

    if (user.role !== "admin")
        return next(errorHandler(403, "You are not an admin"))

    res.user = user;

    next();

}