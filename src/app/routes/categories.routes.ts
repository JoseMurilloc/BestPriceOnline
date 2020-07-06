import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';
import AuthMiddleware from '../middlewares/auth'

const categoryRoutes = Router()

categoryRoutes.get('/categories', AuthMiddleware, CategoryController.index)

export default categoryRoutes
