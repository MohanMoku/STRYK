import express from "express";
import { getOrders, orderReturnRequest, placeOrder, upDateOrderStatus } from "../controllers/order.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { verifyIsAdmin } from "../utils/verifyAdmin.js";

const router = express.Router();

router.post('/placeOrder',verifyToken, placeOrder)
router.get('/allOrders',verifyIsAdmin, getOrders)
router.put('/orderReturnRequest', verifyToken, orderReturnRequest)
router.put('/upDateOrderStatus',verifyToken, upDateOrderStatus)

export default router;