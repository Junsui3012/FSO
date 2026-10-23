import mongoose from 'mongoose'
import { MONGO_URI } from '../utils/config.js'

mongoose.set('strictQuery', false)
mongoose.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id
    return ret
  },
})

mongoose.connect(MONGO_URI, { family: 4 })
  .then((result) => {
    console.log(`Connection to ${result.connection.name} successful`)
  })
  .catch(err => {
    console.log(`Connection to MongoDB failed: ${err.message}`)
  })

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 50,
  },
  author: {
    type: String,
    required: true,
    maxLength: 20,
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: v => /https?:\/\/[^\s]+/.test(v),
      message: props => `${props.value} is not a valid URL`,
    },
    set: v => /https?:\/\/[^\s]+/.exec(v)?.[0] ?? v,
  },
  likes: {
    type: Number,
    default: 0,
    min: [0, 'Likes cannot be negative'],
    validate: {
      validator: v => Number.isInteger(v),
      message: props => `${props.value} is not a whole number`,
    },
  },
})

export default mongoose.model('BlogPost', BlogSchema)
