import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js"
import productRoutes from "./routes/product.route.js"
import orderRouter from "./routes/order.route.js"
import { errorMiddleware } from "./middleware/error.middleware.js";
import { verifyIsAdmin } from "./utils/verifyAdmin.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4444;
app.use(express.json());
app.use(cookieParser());
connectDB();
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get(/^\/(?!api\/).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.get('/api/', verifyIsAdmin, (req, res) => {
    console.log("STRYK");
    res.json({ "name": 'STRYK' })
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRouter);

app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`SERVER IS ON -- Serving in ${PORT}`);
});