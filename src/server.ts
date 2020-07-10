import express, { Request, Response, NextFunction } from 'express'
import routes from './app/routes'
import uploadConfig from './app/config/upload'

import './app/database'

const app = express()

app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  return response.status(500).json({
    message: err.message
  })
})

app.listen(3333, () => console.log('Server run port http://localhost:3333 🚀'))
