import { Router } from 'express';
import UserProviderController from '../controllers/UserProviderController';
import AuthMiddleware from '../middlewares/auth'

const productRoutes = Router()

productRoutes.get('/user/providers', AuthMiddleware, UserProviderController.index)
productRoutes.post('/user/providers', AuthMiddleware, UserProviderController.store)

export default productRoutes;
