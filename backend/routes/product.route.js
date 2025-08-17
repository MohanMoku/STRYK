import express from 'express'
import { addLike, addProduct, getAllProductsToAdmin, getThisProductById, searchQuery, updateProduct } from '../controllers/product.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.get('/getAllProducts', getAllProductsToAdmin)
router.get('/getProduct', getThisProductById)
router.post('/addProduct', addProduct)
router.post('/:productId/like', verifyToken, addLike)
router.put('/updateProduct', updateProduct)
router.get('/search', searchQuery)

export default router