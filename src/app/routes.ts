import { Router } from 'express'

import AuthMiddleware from './middlewares/auth'
import multer from 'multer'
import uploadConfig from './config/upload'

import SessionController from './controllers/SessionController'
import UserController from './controllers/UserController'
import ProductController from './controllers/ProductController'
import CategoryController from './controllers/CategoryController'
import ListController from './controllers/ListController'

const routes = Router()
const upload = multer(uploadConfig)

// Users
routes.post('/users', UserController.store)
routes.patch('/avatars', AuthMiddleware, upload.single('avatar'), UserController.create)

// Sessions
routes.post('/sessions', SessionController.store)

// Products
routes.get('/products', AuthMiddleware, ProductController.index)
routes.post('/products', AuthMiddleware, ProductController.store)

// Categories
routes.get('/categories', AuthMiddleware, CategoryController.index)

// List
routes.get('/lists', AuthMiddleware, ListController.index)
routes.get('/lists/:id', AuthMiddleware, ListController.show)
routes.post('/lists', AuthMiddleware, ListController.store)

export default routes
