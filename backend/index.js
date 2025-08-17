import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js"
import productRoutes from "./routes/product.route.js"
import { errorMiddleware } from "./middleware/error.middleware.js";
import { verifyIsAdmin } from "./utils/verifyAdmin.js";

const app = express();
const PORT = process.env.PORT || 4444;

app.use(express.json());
app.use(cookieParser());
dotenv.config();
connectDB();

app.get('/api/',verifyIsAdmin, (req, res) => {
    console.log("STRYK");
    res.json({ "name": 'STRYK' })
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);

app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`SERVER IS ON -- Serving in ${PORT}`);
});