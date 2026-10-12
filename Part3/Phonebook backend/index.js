import express from "express"
import morgan from "morgan"
import cors from "cors"

const NOTES = [
    {
        name: "Adrian",
        number: "+67-6767676767",
        id: "1",
    },
    {
        name: "Drake",
        number: "+89-7320013439",
        id: "2",
    },
    {
        name: "Betty",
        number: "+12-3434343434",
        id: "3",
    }
]

const generateID = () => {
    const increment = NOTES.reduce((max, curr) => {
        const currID = Number(curr.id)
        if (currID > max) return currID
        return max
    }, 0)

    const RandNum = Math.floor(Math.random() * 100_000)
    return String(increment + RandNum)
}

const app = express()
const PORT = process.env.PORT || 3001

morgan.token("body-content", (req, res) => { return JSON.stringify(req.body) })

app.use(cors())
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body-content"))

app.get('/', (req, res) => {
    res.send("<h1>Hello world</h1>").end()
})

app.get('/info', (req, res) => {
    const len = NOTES.length

    const text = `<p>Phonebook has info for ${len} people</p>
    <p>${new Date().toString()}</p>`
    return res.send(text).end()
})

app.get('/api/persons', (req, res) => {
    return res.status(200).json(NOTES).end()
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    if (!id) return res.status(400).json({ status: "error", message: "Incorrect ID" }).end()

    const matchEntry = NOTES.find(val => val.id == id)
    if (!matchEntry) return res.status(404).json({ status: "error", message: "Record not found" }).end()

    return res.json(matchEntry).end()
})

app.post('/api/persons', (req, res) => {
    const data = req.body
    const name = data.name.trim().toLowerCase()
    const number = data.number.trim()
    if (!name || !number) return res.status(400).json({ status: "error", message: "Missing data" }).end()

    if (NOTES.find(val => val.name.toLowerCase() === name)) return res.status(409).json({ status: "error", message: `${name} already exists in records` }).end()

    const id = generateID()
    const newEntry = {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        number,
        id,
    }

    NOTES.push(newEntry)
    return res.status(201).json(newEntry).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    if (!id) return res.status(400).json({ status: "error", message: "Incorrect ID" }).end()

    const matchIndex = NOTES.findIndex(val => val.id == id)
    if (!matchIndex) return res.status(404).json({ status: "error", message: "Record not found" }).end()

    const deleted_data = NOTES[matchIndex]
    NOTES.splice(matchIndex, 1)

    return res.send(deleted_data).end()
    // return res.status(204).end()
})

app.patch('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    if (!id) return res.status(400).json({ status: "error", message: "Incorrect ID" }).end()

    const data = req.body
    const number = data.number.trim()
    if (!number) return res.status(400).json({ status: "error", message: "Missing data" }).end()

    const matchIndex = NOTES.findIndex(val => val.id == id)
    if (!matchIndex) return res.status(404).json({ status: "error", message: "Record not found" }).end()

    NOTES[matchIndex].number = number
    return res.status(200).json(NOTES[matchIndex]).end()
})

const UnknownEndpoint = (req, res) => {
    return res.status(404).json({ status: "error", message: "Unknown Endpoint" })
}
app.use(UnknownEndpoint)

app.listen(PORT, "localhost", () => {
    console.log(`Server running at http://localhost:${PORT}/`)
})
