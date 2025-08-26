import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { errorHandler } from '../utils/error.js';
import { mailToUser } from '../utils/sendMail.js'

export const google = async (req, res, next) => {

    const source = req.get("host") || 'unknown';

    if (source !== 'stryk.onrender.com') {

        console.log('User came from:', source);
        const data = {
            error: "Unauthorized Action"
        }
        res.send(data);
        return;
    }

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

            const subject = "🎉 Welcome to STRYK Store!";
            const html = `<div style="font-family: Arial, sans-serif; line-height:1.5;">
                            <h2>Welcome aboard!</h2>
                                <p>Hi ${req.body.name},</p>
                            <p>Thanks for joining us. We're excited to have you with us 🚀</p>
                            <p>Here you can grab the <b>best football jerseys</b> to show your passion for the game.</p>
                            <p style="margin-top:15px;">Stay tuned – we’ve got exclusive offers coming your way 😉</p>
                            <p style="margin-top:25px;">– <b>STRYK</b> ⚽</p>
                        </div>`;

            await mailToUser(req.body.email, subject, html);

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
        next(errorHandler(500, error));
    }
};

export const signout = (req, res) => {
    res.clearCookie('token_check').status(200).json('Signout success!');
};