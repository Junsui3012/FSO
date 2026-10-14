import mongoose from "mongoose"

const USERNAME = process.env.MONGODB_USERNAME
// const PASSWORD = process.env.MONGODB_PASSWORD
if (process.argv.length < 3) {
    console.log("Please give password")
    process.exit(1)
}
const PASSWORD = process.argv[2]
console.log(USERNAME, PASSWORD)

const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.dquxruz.mongodb.net/phonebookApp?retryWrites=true&appName=Cluster0`
console.log(URI)

mongoose.set('strictQuery', false)

mongoose.connect(URI, { family: 4 })


const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Entry = mongoose.model("Entry", entrySchema)

if (process.argv.length === 3) {
    Entry.find({})
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(`Error encountered: ${err.message}`))
        .finally(() => mongoose.connection.close())
}
else {
        const entryName = process.argv[3]
        const entryNumber = process.argv[4]
    
    if (!entryName || !entryNumber) {
        console.log("Please provide all parameters for new entry")
        process.exit(1)
    }

    const newEntry = new Entry({
        name: entryName,
        number: entryNumber,
    })

    newEntry.save()
        .then(result => {
            console.log("successfully created new entry")
            console.log("Entry is: ", result)
        })
        .catch(err => console.log(`Error encountered while saving: ${err.message}`))
        .finally(() => mongoose.connection.close())
}