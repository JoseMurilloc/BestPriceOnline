import { Router } from 'express'

import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'

import AuthMiddleware from './middlewares/auth'
import ProductController from './controllers/ProductController'
import CategoryController from './controllers/CategoryController'
import ListController from './controllers/ListController'

const routes = Router()

// Users
routes.post('/users', UserController.store)

// Sessions
routes.post('/sessions', SessionController.store)

// Products
routes.get('/products', AuthMiddleware, ProductController.index)
routes.post('/products', AuthMiddleware, ProductController.store)

// Categories
routes.get('/categories', AuthMiddleware, CategoryController.index)

// List
routes.post('/lists', AuthMiddleware, ListController.store)

export default routes
