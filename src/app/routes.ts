import { Router } from 'express'

import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'

// import AuthMiddleware from './middlewares/auth'

const routes = Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

// routes.get('/test', AuthMiddleware, (req, res) => {
//   console.log(req.user)
//   return res.json({ message: 'Aprovado' })
// })

export default routes
