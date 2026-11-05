import express from 'express'
import BlogRouter from './routes/BlogPost.js'
import UserRouter from './routes/User.js'
import { reqLogger, unknownEndpoint, errorHandler } from './utils/middleware.js'

const app = express()

app.use(express.json())
app.use(reqLogger)

app.use('/api/blogs', BlogRouter)
app.use('/api/users', UserRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
