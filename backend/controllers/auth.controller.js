import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const google = async (req, res, next) => {

    const source = req.query.source || 'unknown';

    // if (source !== 'http://localhost:3000') {

    //     console.log('User came from:', source);
    //     const data = {
    //         error: "Unauthorized Action"
    //     }
    //     res.send(data);
    //     return ;
    // }

    try {

        const user = await User.findOne({ email: req.body.email });

        if (user) {

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const expiryDate = new Date(Date.now() + 1209600000);

            const { password: hashedPassword, ...rest } = user._doc;

            res
                .cookie('token_check', token, {
                    httpOnly: true,
                    expires: expiryDate,
                })
                .status(200)
                .json(rest);

        } else {

            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                dpUri: req.body.photo,
            });

            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

            const { password: hashedPassword2, ...rest } = newUser._doc;

            const expiryDate = new Date(Date.now() + 1209600000);
            res
                .cookie('token_check', token, {
                    httpOnly: true,
                    expires: expiryDate,
                })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};

export const signout = (req, res) => {
    res.clearCookie('token_check').status(200).json('Signout success!');
};