import { Router } from 'express'
import UserController  from '../controllers/UserController'
import AuthMiddleware from '../middlewares/auth'
import multer from 'multer'
import uploadConfig from '../config/upload'

const userRoutes = Router()

const upload = multer(uploadConfig)

userRoutes.post('/users', UserController.store)
userRoutes.patch(
  '/avatars',
  AuthMiddleware,
  upload.single('avatar'),
  UserController.create
)

userRoutes.put('/users', AuthMiddleware, UserController.update)

export default userRoutes
