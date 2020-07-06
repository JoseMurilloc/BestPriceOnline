import express from 'express'
import routes from './app/routes'
import uploadConfig from './app/config/upload'

import './app/database'

const app = express()

app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.listen(3333, () => console.log('Server run port http://localhost:3333 🚀'))
