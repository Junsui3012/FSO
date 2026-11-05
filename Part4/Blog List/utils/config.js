
const MONGODB_USERNAME = process.env.MONGODB_USERNAME
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD
const NODE_ENV = process.env.NODE_ENV?.trim()
const MONGO_URI = (NODE_ENV === 'test') ? 
`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.dquxruz.mongodb.net/testBlogListApp?retryWrites=true&appName=Cluster0` : 
`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.dquxruz.mongodb.net/blogListApp?retryWrites=true&appName=Cluster0`
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || '3001'
const JWT_SECRET = process.env.PASS_SECRET

export {
  MONGO_URI,
  HOST,
  PORT,
  JWT_SECRET,
}