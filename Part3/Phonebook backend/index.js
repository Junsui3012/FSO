import express from 'express'
import morgan from 'morgan'
// import cors from "cors"
import Entry from './models/EntryModel.js'
import mongoose from 'mongoose'

const app = express()
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3001

morgan.token('body-content', (req) => { return JSON.stringify(req.body) })

app.use(express.static('dist'))
// CORS can be removed now that the frontend is hosted from the same domain
// app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body-content'))

app.param('id', async (req, res, next, id) => {
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({status: 'error', message: 'ID validation failed'})
  const doc = await Entry.findById(id)
  if (!doc) return res.status(404).json({status: 'error', message: 'Record not found'})
  req.entry = doc
  next()
})

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.get('/info', async (req, res, next) => {
  try {
    const result = await Entry.find({})
    const len = result.length

    const text = `<p>Phonebook has info for ${len} people</p>
        <p>${new Date().toString()}</p>`
    return res.send(text)
  }
  catch (err) {
    next(err)
  }
})

app.get('/api/persons', async (req, res, next) => {
  try {
    const result = await Entry.find({})
    return res.json(result)
  }
  catch (err) {
    next(err)
  }
})

app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const result = req.entry
    return res.json(result)
  }
  catch (err) {
    next(err)
  }
})

app.post('/api/persons', async (req, res, next) => {
  const name = req.body?.name?.trim().toLowerCase()
  const number = req.body?.number?.trim()

  try {
    const capitalizedName = name?.charAt(0).toUpperCase().concat(name?.slice(1))
    const exists = await Entry.exists({name: capitalizedName})
    if (exists) return res.status(409).json({status: 'error', message: `${capitalizedName} already exists in records`})

    const newEntry = new Entry({
      name: capitalizedName,
      number,
    })

    const result = await newEntry.save()
    return res.status(201).json(result)
  }
  catch (err) {
    next(err)
  }
})

app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    const doc = req.entry
    await doc.deleteOne()
    return res.json(doc)
    // return res.status(204).end()
  }
  catch (err) {
    next(err)
  }
})

app.patch('/api/persons/:id', async (req, res, next) => {
  try {
    const number = req.body?.number?.trim()
    const doc = req.entry
    doc.number = number
    await doc.save()
    return res.json(doc)
  }
  catch (err) {
    next(err)
  }
})

const UnknownEndpoint = (req, res) => {
  return res.status(404).json({status: 'error', message: 'Unknown Endpoint'})
}
app.use(UnknownEndpoint)

const errorHandler = (err, req, res) => {
  if (err.name === 'ValidationError') return res.status(400).json({status: 'error', message: `Invalid Data : ${err.message}`})
  return res.status(500).json({status: 'error', message: `Server error : ${err.message}`})
}
app.use(errorHandler)

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`)
})
