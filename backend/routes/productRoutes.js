
import express from "express";
import {admin, protect} from "../middleware/authMiddleware.js";
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, getTopRatedProducts, updateProduct } from "../controllers/productController.js";
const router = express.Router();


router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)
router.get('/top',getTopRatedProducts)
router.route('/:id')
    .get(getProductById)
    .put(protect,admin,updateProduct)
    .delete(protect, admin, deleteProduct)
    
router.route('/:id/reviews').post(protect,createProductReview)

export default router