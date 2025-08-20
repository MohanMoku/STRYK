import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js";
import { mailToUser } from "../utils/sendMail.js";


export const placeOrder = async (req, res, next) => {

    try {

        const { items, paymentMethod, shippingAddress, user } = req.body;
        let totalAmount = 0;

        for (let item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return next(errorHandler(404, "Product not found"));
            }
            totalAmount += item.quantity * item.price;
        }
        // for (let item of items) {
        //     await Product.findByIdAndUpdate(
        //         item.product,
        //         { $inc: { stock: -item.quantity } }
        //     );
        // }
        for (let item of items) {
            await Product.findByIdAndUpdate(
                item.product,
                { $inc: { [`stock.${item.size}`]: -item.quantity } }
            );
        }

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        const user1 = await User.findById(user.id);
        const newOrder = new Order({
            user: user.id,
            items,
            totalAmount,
            paymentMethod,
            shippingAddress,
            otpCode,
            userName: user.name,
            userPhone: user.phone
        });
        await newOrder.save();
        user1.orders.push(newOrder._id);
        await user1.save();

        const deliveryCharge = newOrder.totalAmount > 999 ? 0 : 40;
        const grandTotal = newOrder.totalAmount + deliveryCharge;

        const subject = "🎉 Welcome to STRYK Store!";
        const html = `<div style="font-family: Arial, sans-serif; line-height:1.5;">
                        <h2>Order Delivery OTP</h2>
                        <p>Hi ${user.name},</p>
                        <p>Your order <b>#${newOrder._id}</b> is on the way 🚚</p>
                        <p>To confirm delivery, please provide the OTP below to our delivery partner:</p>
                        
                        <div style="margin:20px 0; padding:15px; background:#007bff; color:#fff; font-size:22px; font-weight:bold; text-align:center; border-radius:8px;">
                            ${otpCode}
                            </div>
                            
                            <h3>🛍️ Order Summary</h3>
                        <table style="width:100%; border-collapse:collapse; margin-top:10px;">
                            <thead>
                                <tr style="background:#f4f4f4;">
                                    <th style="padding:8px; border:1px solid #ddd;">Product</th>
                                    <th style="padding:8px; border:1px solid #ddd;">Quantity</th>
                                    <th style="padding:8px; border:1px solid #ddd;">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${newOrder.items.map(item => `
                                    <tr>
                                        <td style="padding:8px; border:1px solid #ddd;">${item.productName}</td>
                                        <td style="padding:8px; border:1px solid #ddd; text-align:center;">${item.quantity}</td>
                                        <td style="padding:8px; border:1px solid #ddd; text-align:right;">₹${(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                `).join("")}
                                <tr>
                                    <td colspan="2" style="padding:8px; border:1px solid #ddd; text-align:right;">Subtotal</td>
                                    <td style="padding:8px; border:1px solid #ddd; text-align:right;">₹${newOrder.totalAmount.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="padding:8px; border:1px solid #ddd; text-align:right;">Delivery Charge</td>
                                    <td style="padding:8px; border:1px solid #ddd; text-align:right;">₹${deliveryCharge}</td>
                                </tr>
                                <tr style="background:#f9f9f9; font-weight:bold;">
                                    <td colspan="2" style="padding:8px; border:1px solid #ddd; text-align:right;">Grand Total</td>
                                    <td style="padding:8px; border:1px solid #ddd; text-align:right;">₹${grandTotal.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                                    
                        <p style="margin-top:15px;"><b>Note:</b> This OTP is valid only once. Please do not share it with anyone else 🔒</p>
                        <p>Also, while receiving your order, kindly <b>check the package for any damages</b> before confirming ✅</p>
                                    
                        <p style="margin-top:25px;">– <b>STRYK</b> ⚽</p>
                    </div>`;
        await mailToUser(user.email, subject, html);
        res
            .status(201)
            .json({
                message: "Order placed successfully",
                order: newOrder
            });
    } catch (error) {
        next(errorHandler(500, error))
    }
}

export const getOrders = async (req, res, next) => {

    try {

        const orders = await Order.find().sort({ updatedAt: -1 })
        res
            .status(200)
            .json({ orders: orders })

    } catch (error) {
        next(errorHandler(500, error))
    }

}

export const orderReturnRequest = async (req, res, next) => {

    try {

        const { id } = req.user;
        const { orderId, message } = req.body;

        const order = await Order.findById(orderId);
        if (!order) return next(errorHandler(404, "Order not found"))

        if (id !== order.user.toString()) return next(errorHandler(403, "You are not authorized to perform this action"))

        order.isReturnRequested = true;
        order.returnReason = message;
        order.status = "Return Requested";
        await order.save();

        res
            .status(200)
            .json({ message: "Return request sent successfully" });

    } catch (error) {
        next(errorHandler(500, error))
    }

}

export const upDateOrderStatus = async (req, res, next) => {

    try {

        const { orderId, status, email, name } = req.body;
        const order = await Order.findById(orderId);

        if (!order) return next(errorHandler(404, "Order not found"))

        order.status = status;
        await order.save();

        // const email =
        const subject = "🎉 Welcome to STRYK Store!";
        const html = `<div style="font-family: Arial, sans-serif; line-height:1.5;">
                            <h2 style="color:#28a745;">✅ Your Order Has Been Delivered!</h2>
                            <p>Hi ${name},</p>
                            <p>Great news – your order <b>#${order._id}</b> has been <b>successfully delivered</b> 🎉</p>
                            <p>We hope you enjoy your new gear and show your football passion in style ⚽</p>
                            <p style="margin-top:15px;">Thank you for shopping with <b>STRYK</b>. Your support means the world to us 💙</p>
                            <p style="margin-top:25px;">– <b>STRYK Team</b></p>
                        </div>`;


        if (status === "Delivered") {
            await mailToUser(email, subject, html);
        }

        res
            .status(200)
            .json({ message: "Order status updated successfully" });

    } catch (error) {
        next(errorHandler(500, error))
    }

}