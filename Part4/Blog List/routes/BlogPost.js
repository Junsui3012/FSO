import express from 'express'
import { cout, errobj } from '../utils/logger.js'
import Blog from '../models/BlogModel.js'
import mongoose from 'mongoose'
import BlogModel from '../models/BlogModel.js'

const BlogRouter = express.Router()

BlogRouter.param('id', async (req, res, next, id) => {
  if (!mongoose.isValidObjectId(id)) return res.status(400).json(errobj('error', 'Invalid ID'))
  const doc = await Blog.findById(id)
  if (!doc) return res.status(404).json(errobj('error', 'No records found'))
  req.data = doc
  next()
})

BlogRouter.get('/', async (req, res) => {
  const data = await Blog.find({})
  return res.json(data)
})

BlogRouter.get('/:id', async (req, res) => {
  const data = req.data
  return res.json(data)
})

BlogRouter.post('/', async (req, res) => {
  const data = req.body
  const newPost = new Blog({
    title: data?.title,
    author: data?.author,
    url: data?.url,
  })

  await newPost.save()
  return res.status(201).json(newPost)
})

BlogRouter.patch('/:id', async (req, res) => {
  const data = req.body
  const doc = req.data

  doc.title = data.title ?? doc.title
  doc.author = data.author ?? doc.author
  doc.url = data.url ?? doc.url
  await doc.save()
  return res.json(doc)
})

BlogRouter.post('/:id/like', async (req, res) => {
  const id = req.params.id

  const blog = await BlogModel.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { returnDocument: 'after' })
  return res.json(blog)
})

BlogRouter.post('/:id/unlike', async (req, res) => {
  const id = req.params.id

  const blog = await BlogModel.findByIdAndUpdate(id, { $inc: { likes: -1 } }, { returnDocument: 'after' })
  return res.json(blog)
})

BlogRouter.delete('/:id', async (req, res) => {
  const doc = req.data
  await doc.deleteOne()
  return res.status(204).end()
})

export default BlogRouter
