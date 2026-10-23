import { HOST, PORT } from './utils/config.js'
import { cout } from './utils/logger.js'
import app from './app.js'

app.listen(PORT, HOST, () => {
  cout(`Server running at http://${HOST}:${PORT}`)
})
