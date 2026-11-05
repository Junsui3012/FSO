import express from "express"
import UserModel from "../models/UserModel.js"
import BlogModel from "../models/BlogModel.js"
import mongoose from "mongoose"
import { cout, errobj } from "../utils/logger.js"

const UserRouter = express.Router()

UserRouter.param("id", async (req, res, next, id) => {
    if (!mongoose.isValidObjectId(id)) return res.status(400).json(errobj("error", "Invalid ID"))
    const user = await UserModel.findById(id)
    if (!user) return res.status(404).json(errobj("error", "No user found for this ID"))
    req.data = user
    next()
})

UserRouter.get("/", async (req, res) => {
    const users = await UserModel.find({})
    return res.json(users)
})

UserRouter.get("/:id", async (req, res) => {
    const user = req.data
    return res.json(user)
})

UserRouter.get("/:id/posts", async (req, res) => {
    const user = req.data
    const posts = await BlogModel.find({ user: user._id }).populate("user")
    return res.json(posts)
})

UserRouter.post("/", async (req, res) => {
    const data = req.body

    const newUser = new UserModel({
        username: data?.username,
        passwordHash: data?.password,
    })

    await newUser.save()
    return res.status(201).json(newUser)
})

UserRouter.patch("/:id/change_password", async (req, res) => {
    const user = req.data
    const new_pass = req.body?.password

    user.passwordHash = new_pass ?? undefined

    await user.save()
    return res.json(user)
})

UserRouter.delete("/:id", async (req, res) => {
    const user = req.data

    const session = await mongoose.startSession()
    session.startTransaction()

    await BlogModel.deleteMany({ user: user._id })
    await user.deleteOne()

    await session.commitTransaction()
    await session.endSession()

    return res.status(204).end()
})

export default UserRouter
