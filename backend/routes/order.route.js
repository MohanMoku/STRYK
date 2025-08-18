import express from "express";
import { getOrders, orderReturnRequest, placeOrder, upDateOrderStatus } from "../controllers/order.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/placeOrder', placeOrder)
router.get('/allOrders', getOrders)
router.put('/orderReturnRequest', verifyToken, orderReturnRequest)
router.put('/upDateOrderStatus', upDateOrderStatus)

export default router;