import morgan from 'morgan'
import { cout, errobj } from '../utils/logger.js'

const reqLogger = morgan('combined')

const unknownEndpoint = (req, res) => {
  return res.status(404).send(`<h1>Unknown End point</h1>
        <p>Please check the address again</p>`)
}

const errorHandler = (err, req, res, _next) => {
  let code = 500
  let message

  if (err.code === 11000) {
    code = 409
    message = `Conflict of data: ${err.message}`
  }
  if (err.name === 'ValidationError') {
    code = 400
    message = `Incorrect data: ${err.message}`
  }
  else {
    message = `Server error: ${err.message}`
  }

  return res.status(code).json(errobj('error', message))
}

export {
  reqLogger,
  unknownEndpoint,
  errorHandler,
}
