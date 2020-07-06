import { Router } from 'express'
import ListController from '../controllers/ListController'
import AuthMiddleware from '../middlewares/auth'
import ProductListController from '../controllers/ProductListController'

const listRoutes = Router()

listRoutes.get('/lists', AuthMiddleware, ListController.index)
listRoutes.get('/lists/:id', AuthMiddleware, ListController.show)
listRoutes.post('/lists', AuthMiddleware, ListController.store)

listRoutes.post(
  '/lists/:id/products', 
  AuthMiddleware, 
  ProductListController.store
)

export default listRoutes
