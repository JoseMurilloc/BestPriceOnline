import { Router } from 'express'

import listRoutes from './list.routes'
import userRoutes from './user.routes'
import productRoutes from './product.routes'
import categoryRoutes from './categories.routes'
import sessionRoutes from './session.routes'
import userProviderRoutes from './provider.routes'

const routes = Router()

routes.use(sessionRoutes)
routes.use(userRoutes)
routes.use(productRoutes)
routes.use(categoryRoutes)
routes.use(listRoutes)
routes.use(userProviderRoutes)

export default routes
