
const MONGODB_USERNAME = process.env.MONGODB_USERNAME
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD
const MONGO_URI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.dquxruz.mongodb.net/blogListApp?retryWrites=true&appName=Cluster0`
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || '3001'

export {
  MONGO_URI,
  HOST,
  PORT,
}