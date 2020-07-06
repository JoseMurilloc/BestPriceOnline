import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import AuthMiddleware from '../middlewares/auth'

const productRoutes = Router()

productRoutes.get('/products', AuthMiddleware,ProductController.index)
productRoutes.post('/products', AuthMiddleware, ProductController.store)

export default productRoutes;