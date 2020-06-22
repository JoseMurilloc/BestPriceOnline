import express from 'express'
import routes from './app/routes'

import './app/database'

const app = express()

app.use(express.json())
app.use(routes)

app.listen(3333, () => console.log('Server runing port http://localhost:3333 🚀'))
