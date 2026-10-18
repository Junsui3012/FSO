import mongoose from "mongoose"

// using the --env-file=.env flag in npm start, so dotenv was skipped
const USERNAME = process.env.MONGODB_USERNAME
const PASSWORD = process.env.MONGODB_PASSWORD

const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.dquxruz.mongodb.net/phonebookApp?retryWrites=true&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id
        return ret
    }
})

mongoose.connect(URI, { family: 4 })
    .then(result => {
        console.log("MongoDB connected successfully")
    })
    .catch(err => {
        console.log("Failed to connect to MongoDB :", err.message)
    })

const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Entry = mongoose.model("Entry", entrySchema)
export default Entry