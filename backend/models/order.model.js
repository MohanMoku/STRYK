import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [orderItemSchema],

    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Return Requested", "Returned"],
        default: "Pending"
    },

    paymentMethod: {
        type: String,
        enum: ["cod", "Credit Card", "Debit Card", "UPI", "PayPal"],
        required: true
    },

    shippingAddress: {
        type: String,
        required: true
    },

    isReturnRequested: {
        type: Boolean,
        default: false
    },
    returnReason: {
        type: String,
        default: ""
    },

    otpCode: {
        type: String,
        required: false
    },

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
