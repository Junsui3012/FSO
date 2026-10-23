import express from 'express'
import { cout, errobj } from '../utils/logger.js'
import Blog from '../models/BlogModel.js'
import mongoose from 'mongoose'

const BlogRouter = express.Router()

BlogRouter.param('id', async (req, res, next, id) => {
  if (!mongoose.isValidObjectId(id)) return res.status(400).json(errobj('error', 'Invalid ID'))
  const doc = await Blog.findById(id)
  if (!doc) return res.status(404).json(errobj('error', 'No records found'))
  req.data = doc
  next()
})

BlogRouter.get('/', async (req, res, next) => {
  try {
    const data = await Blog.find({})
    return res.json(data)
  }
  catch (err) {
    next(err)
  }
})

BlogRouter.get('/:id', async (req, res, next) => {
  try {
    const data = req.data
    return res.json(data)
  }
  catch (err) {
    next(err)
  }
})

BlogRouter.post('/', async (req, res, next) => {
  const data = req.body
  try {
    const newPost = new Blog({
      title: data?.title,
      author: data?.author,
      url: data?.url,
    })

    await newPost.save()
    return res.status(201).json(newPost)
  }
  catch (err) {
    next(err)
  }
})

export default BlogRouter
