import mongoose from "mongoose"
import { MONGO_URI } from "../utils/config.js"
import bcrypt from "bcrypt"

mongoose.set("strictQuery", true)

mongoose.connect(MONGO_URI)

/**
 * @typedef {Object} UserFields
 * @property {String} username
 * @property {String} passwordHash
*/

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        maxLength: 15,
        unique: true,
        required: true,
    },
    passwordHash: {
        type: String,
        minLength: 6,
        maxLength: 15,
        required: true,
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[!@_#$%&^*])[a-zA-Z\d!@_#$%&^*]{6,15}$/,
            "Password must contain at least 1 lowercase, 1 uppercase, 1 special char (!@_#$%&^*) and 1 digit",
        ],
    },
})

UserSchema.pre("save", async function () {
    const doc = this

    if (!doc.isDirectModified("passwordHash")) return
    doc.passwordHash = await bcrypt.hash(doc.passwordHash, 10)
})

UserSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id
        delete ret.passwordHash
        return ret
    }
})

/**@type {mongoose.Model<mongoose.Document & UserFields>} */
const UserModel = mongoose.model("User", UserSchema)
export default UserModel
