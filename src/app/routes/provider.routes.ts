import { Router } from 'express';
import UserProviderController from '../controllers/UserProviderController';
import AuthMiddleware from '../middlewares/auth'

const userProviderRoutes = Router()

userProviderRoutes.get('/user/providers', AuthMiddleware, UserProviderController.index)
userProviderRoutes.post('/user/providers', AuthMiddleware, UserProviderController.store)

export default userProviderRoutes;
