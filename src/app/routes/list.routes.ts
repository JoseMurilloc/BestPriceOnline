import { Router } from 'express'
import ListController from '../controllers/ListController'
import AuthMiddleware from '../middlewares/auth'

const listRoutes = Router()

listRoutes.get('/lists', AuthMiddleware, ListController.index)
listRoutes.get('/lists/:id', AuthMiddleware, ListController.show)
listRoutes.post('/lists', AuthMiddleware, ListController.store)

export default listRoutes
