import morgan from 'morgan'
import { cout, errobj } from '../utils/logger.js'

const reqLogger = morgan('combined')

const unknownEndpoint = (req, res) => {
  return res.status(404).send(`<h1>Unknown End point</h1>
        <p>Please check the address again</p>`)
}

const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') return res.status(400).json(errobj('error', `Incorrect data: ${err.message}`))
  return res.status(500).json(errobj('error', `Server error: ${err.message}`))
}

export {
  reqLogger,
  unknownEndpoint,
  errorHandler,
}
