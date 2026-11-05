import { describe, it, beforeEach, after } from "node:test"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import UserModel from "../models/UserModel.js"
import BlogModel from "../models/BlogModel.js"
import assert from "node:assert"
import app from "../app.js"
import supertest from "supertest"
import { initial_blog_data, initial_user_data, get_users, get_blogs } from "../utils/api_test_helper.js"

const api = supertest(app)

beforeEach(async () => {
    await UserModel.deleteMany({})
    await BlogModel.deleteMany({})
    await UserModel.insertMany(initial_user_data)
    const users = await get_users()
    const blogs = initial_blog_data.map((post, i) => ({
        ...post,
        user: users[i % users.length].id,
    }))
    await BlogModel.insertMany(blogs)
})

describe("The API header", () => {
    it("has JSON content type", async (t) => {
        const users = await get_users()

        const response = await api.get("/api/users")
            .expect(200)
            .expect("content-type", /application\/json/)

        assert.deepEqual(response.body, users)
    })

    it("has correct type for specific record", async (t) => {
        const random_index = Math.floor(Math.random() * initial_user_data.length)
        const users = await get_users()
        const selected_user = users[random_index]
        const selected_id = selected_user.id

        const response = await api.get(`/api/users/${selected_id}`)
            .expect(200)
            .expect("content-type", /application\/json/)

        assert.deepStrictEqual(response.body, selected_user)
    })

    it("throws for invalid id", async (t) => {
        const bad_id = "abcd"

        const response = await api.get(`/api/users/${bad_id}`)
            .expect(400)

        assert.strictEqual(response.body.status, "error")
    })

    it("throws for valid but absent id", async (t) => {
        const bad_id = "6ae594f247e486fb019953bb"

        const response = await api.get(`/api/users/${bad_id}`)
            .expect(404)

        assert.strictEqual(response.body.status, "error")
    })
})

describe("The body of the response", () => {
    it("contains all users in database", async (t) => {
        const users = await get_users()

        const response = await api.get("/api/users")
            .expect(200)
            .expect("content-type", /application\/json/)

        assert.deepStrictEqual(response.body, users)
    })

    it("is the same for any random record", async (t) => {
        const random_index = Math.floor(Math.random() * initial_user_data.length)
        const users = await get_users()
        const random_user = users[random_index]
        const random_id = random_user.id

        const response = await api.get(`/api/users/${random_id}`)
            .expect(200)
            .expect("content-type", /application\/json/)

        assert.deepStrictEqual(response.body, random_user)
    })

    it("contains the new record on new registeration", async (t) => {
        const new_user = {
            username: "RandomDude",
            password: "1aB#extra",
        }
        const usersBefore = await get_users()

        const response = await api.post("/api/users")
            .send(new_user)
            .expect(201)
            .expect("content-type", /application\/json/)

        const usersAfter = await get_users()

        assert.strictEqual(usersAfter.length, usersBefore.length + 1)
        assert.strictEqual(response.body.username, new_user.username)
    })

    it("throws on duplicate name", async (t) => {
        const bad_user = {
            username: "Asuka",
            password: "@Poly1234",
        }

        const usersBefore = await get_users()

        const response = await api.post('/api/users')
            .send(bad_user)
            .expect(409)

        const usersAfter = await get_users()

        assert.strictEqual(usersAfter.length, usersBefore.length)
        assert.strictEqual(response.body.status, "error")
    })

    it("throws on invalid password", async (t) => {
        const bad_user = {
            username: "RandomDude",
            password: "abcd",
        }

        const usersBefore = await get_users()

        const response = await api.post('/api/users')
            .send(bad_user)
            .expect(400)

        const usersAfter = await get_users()

        assert.strictEqual(usersAfter.length, usersBefore.length)
        assert.strictEqual(response.body.status, "error")
    })
})

describe("The user's posts", () => {
    it("can be fetched", async (t) => {
        const users = await get_users()
        const userToFetch = users[0]
        const allBlogs = await BlogModel.find({}).populate("user")

        const response = await api.get(`/api/users/${userToFetch.id}/posts`)
            .expect(200)
            .expect('content-type', /application\/json/)

        const filteredBlogs = allBlogs.filter(val => val.user.id === userToFetch.id).map(val => val.toJSON())

        assert.deepStrictEqual(response.body, filteredBlogs)
    })
})

describe("When a user password is updated", () => {
    it("changes successfully on correct new passowrd", async (t) => {
        const new_pass = "%Bhutan67"
        const usersBefore = await get_users()
        const changeUserId = usersBefore[0].id

        const response = await api.patch(`/api/users/${changeUserId}/change_password`)
            .send({ password: new_pass })
            .expect(200)

        const userAfter = await UserModel.findById(changeUserId)
        assert.ok(await bcrypt.compare(new_pass, userAfter.passwordHash), `The password did not change`)
    })
    it("throws on invalid new passowrd", async (t) => {
        const bad_pass = "abcd"
        const usersBefore = await get_users()
        const changeUserId = usersBefore[0].id

        const response = await api.patch(`/api/users/${changeUserId}/change_password`)
            .send({ password: bad_pass })
            .expect(400)

        assert.strictEqual(response.body.status, "error")
    })
})

describe("When a user is deleted", () => {
    it("removes the user from database", async (t) => {
        const usersBefore = await get_users()
        const userToDelete = usersBefore[0]

        await api.delete(`/api/users/${userToDelete.id}`)
            .expect(204)

        const usersAfter = await get_users()
        assert.strictEqual(usersAfter.length, usersBefore.length - 1)
    })
    it("removes the user's posts from database", async (t) => {
        const usersBefore = await get_users()
        const blogsBefore = await BlogModel.find({}).populate("user")
        const userToDelete = usersBefore[0]

        await api.delete(`/api/users/${userToDelete.id}`)
            .expect(204)

        const expectedBlogs = blogsBefore.filter(val => val.user.id !== userToDelete.id).map(v => v.toJSON())
        const blogsAfter = await get_blogs()

        assert.strictEqual(blogsAfter.length, expectedBlogs.length)
        assert.deepStrictEqual(blogsAfter, expectedBlogs)
    })
})

after(() => {
    mongoose.connection.close()
})
