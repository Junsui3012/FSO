import mongoose from 'mongoose'

// using the --env-file=.env flag in npm start, so dotenv was skipped
const USERNAME = process.env.MONGODB_USERNAME
// const PASSWORD = process.env.MONGODB_PASSWORD
if (process.argv.length < 3) {
  console.log('Please give password')
  process.exit(1)
}
const PASSWORD = process.argv[2]
console.log(USERNAME, PASSWORD)

const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.dquxruz.mongodb.net/phonebookApp?retryWrites=true&appName=Cluster0`
console.log(URI)

mongoose.set('strictQuery', false)

mongoose.connect(URI, {family: 4})


const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
}, {
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id
      return ret
    }
  }
})

const Entry = mongoose.model('Entry', entrySchema)

if (process.argv.length <= 3) {
  Entry.find({})
    .then(result => {
      result.forEach(val => {
        const jobj = val.toJSON()
        console.log('*'.repeat(10))
        console.log(`${jobj.id}`)
        console.log(`${jobj.name}: ${jobj.number}`)
      })
    })
    .catch(err => console.log(`Error encountered: ${err.message}`))
    .finally(() => mongoose.connection.close())
}
else {
  const entryName = process.argv[3]
  const entryNumber = process.argv[4]

  if (!entryName || !entryNumber) {
    console.log('Please provide all parameters for new entry')
    process.exit(1)
  }

  const newEntry = new Entry({
    name: entryName,
    number: entryNumber,
  })

  newEntry.save()
    .then(result => {
      console.log('successfully created new entry')
      console.log('Entry is: ', result)
    })
    .catch(err => console.log(`Error encountered while saving: ${err.message}`))
    .finally(() => mongoose.connection.close())
}