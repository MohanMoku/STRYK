import express from 'express';
import { verifyIsAdmin } from '../utils/verifyAdmin.js';
import { verifyToken } from '../utils/verifyUser.js';
import { addOrRemoveCart, allUsers, deleteUser, getCartProducts, getLikedProducts, getUserByUser, updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/user', verifyToken, getUserByUser)
router.put('/updateUser', verifyToken, updateUser)
router.get('/allUsers', verifyIsAdmin, allUsers)
router.delete('/deleteUser', verifyIsAdmin, deleteUser)
router.get('/getLikedProducts', verifyToken, getLikedProducts)
router.get('/cart', verifyToken, getCartProducts)
router.post('/:productId/cart', verifyToken, addOrRemoveCart)

export default router