import express from 'express'
import { addLike, addProduct, addReview, getAllProductsToAdmin, getThisProductById, reviewDetails, searchQuery, updateProduct } from '../controllers/product.controller.js'
import { verifyToken } from '../utils/verifyUser.js'
import { verifyIsAdmin } from '../utils/verifyAdmin.js'

const router = express.Router()

router.get('/getAllProducts', getAllProductsToAdmin)
router.get('/getProduct', getThisProductById)
router.post('/addProduct', addProduct)
router.post('/:productId/like', verifyToken, addLike)
router.put('/updateProduct',verifyIsAdmin, updateProduct)
router.get('/search', searchQuery)
router.get('/getReviews', reviewDetails)
router.post('/addReview', verifyToken, addReview)

export default router