import { Router } from 'express';
import ProviderController from '../controllers/ProviderController';
import AuthMiddleware from '../middlewares/auth'

const productRoutes = Router()

productRoutes.get('/providers', AuthMiddleware, ProviderController.index)
productRoutes.post('/providers', AuthMiddleware, ProviderController.store)

export default productRoutes;
