import { describe, it, after, beforeEach } from "node:test"
import assert from "node:assert"
import app from "../app.js"
import mongoose from "mongoose"
import BlogModel from "../models/BlogModel.js"
import supertest from "supertest"
import { initial_blog_data, get_blogs } from "../utils/api_test_helper.js"

const api = supertest(app)

beforeEach(async () => {
    await BlogModel.deleteMany({})
    await BlogModel.insertMany(initial_blog_data)
    // const data = initial_data.map(v => new BlogModel(v))
    // const promises = data.map(v => v.save())
    // await Promise.all(promises)
})

describe("The API header of blog post", () => {
    it("has json content type for main route", async (t) => {
        t.diagnostic("getting data from server")
        await api.get('/api/blogs')
            .expect(200)
            .expect("content-type", /application\/json/)
        t.diagnostic("successfully gotten json data from server")
    })

    it("has json content type for random specific record", async (t) => {
        const random_index = Math.floor(Math.random() * initial_blog_data.length)
        const db_data = await get_blogs()
        const random_data = db_data[random_index]
        const data_id = random_data.id
        t.diagnostic(`The ID is ${data_id}`)

        await api.get(`/api/blogs/${data_id}`)
            .expect(200)
            .expect("content-type", /application\/json/)
    })
    it("throws for invalid id", async (t) => {
        const bad_id = "abcd"

        const response = await api.get(`/api/blogs/${bad_id}`)
            .expect(400)

        assert.strictEqual(response.body.status, "error")
    })
    it("throws for valid but absent id", async (t) => {
        const bad_id = "6ae594f247e486fb019953bb"

        const response = await api.get(`/api/blogs/${bad_id}`)
            .expect(404)

        assert.strictEqual(response.body.status, "error")
    })

})

describe("The body of the blog post response", () => {
    it("is the same for any random record", async (t) => {
        const random_index = Math.floor(Math.random() * initial_blog_data.length)
        console.log("r index", random_index)
        const db_data = await get_blogs()
        console.log("db_data", db_data)
        const random_data = db_data[random_index]
        console.log("chosen data", random_data)
        const data_id = random_data.id
        t.diagnostic(`The ID is ${data_id}`)

        const response = await api.get(`/api/blogs/${data_id}`)
            .expect(200)
            .expect("content-type", /application\/json/)

        assert.deepStrictEqual(response.body, random_data)
    })

    it("works for new record and has corrected name", async (t) => {
        const newRecord = {
            title: "JavaScript something something",
            author: "Axel rAuChMaYeR",
            url: "https://2ality.com/",
            user: "6ae5990f0b91826cbb582688",
        }
        const response = await api.post('/api/blogs')
            .send(newRecord)
            .expect(201)
        const databaseAfter = await get_blogs()
        console.log("after data", JSON.stringify(databaseAfter), databaseAfter.length)
        console.log("fetched data", JSON.stringify(response.body), response.body.length)
        assert.strictEqual(response.body.author, "Axel Rauchmayer")
        assert.strictEqual(databaseAfter.length, initial_blog_data.length + 1)
    })
    it("throws for invalid name", async (t) => {
        const newRecord = {
            title: "JavaScript something something",
            author: "Ax-gh)(",
            url: "https://2ality.com/",
            user: "6ae5990f0b91826cbb582688",
        }
        const response = await api.post('/api/blogs')
            .send(newRecord)
            .expect(400)

        assert.strictEqual(response.body.status, "error")
    })
})

describe("The likes of a blog post", () => {
    it("increment by 1", async (t) => {
        const random_index = Math.floor(Math.random() * initial_blog_data.length)
        const random_data = (await get_blogs())[random_index]
        const data_id = random_data.id

        const response = await api.post(`/api/blogs/${data_id}/like`)
            .expect(200)

        t.diagnostic(`Checking likes for ${data_id}`)
        assert.strictEqual(response.body.likes, random_data.likes + 1)
    })

    it("decrement by 1", async (t) => {
        const random_index = Math.floor(Math.random() * initial_blog_data.length)
        const random_data = (await get_blogs())[random_index]
        const data_id = random_data.id

        const response = await api.post(`/api/blogs/${data_id}/unlike`)
            .expect(200)

        t.diagnostic(`Checking likes for ${data_id}`)
        assert.strictEqual(response.body.likes, random_data.likes - 1)
    })
})

describe("The upation of a random blog", () => {
    it("succeds for partial change", async (t) => {
        const random_index = Math.floor(Math.random() * initial_blog_data.length)
        const db_data = await get_blogs()
        const random_data = db_data[random_index]
        const data_id = random_data.id
        t.diagnostic(`The ID is ${data_id}`)

        random_data.title = "Like a Rainbow"

        const response = await api.patch(`/api/blogs/${data_id}`)
            .send(random_data)
            .expect(200)
            .expect("content-type", /application\/json/)

        assert.deepStrictEqual(response.body, random_data)
    })
    it("automatically fixes broken names", async (t) => {
        const random_index = Math.floor(Math.random() * initial_blog_data.length)
        const db_data = await get_blogs()
        const random_data = db_data[random_index]
        const data_id = random_data.id
        t.diagnostic(`The ID is ${data_id}`)

        random_data.author = "jImMy o'weIneR"

        const response = await api.patch(`/api/blogs/${data_id}`)
            .send(random_data)
            .expect(200)
            .expect("content-type", /application\/json/)

        random_data.author = "Jimmy O'Weiner"
        assert.deepStrictEqual(response.body, random_data)
    })
    it("throws for invalid name", async (t) => {
        const random_index = Math.floor(Math.random() * initial_blog_data.length)
        const db_data = await get_blogs()
        const random_data = db_data[random_index]
        const data_id = random_data.id
        t.diagnostic(`The ID is ${data_id}`)

        random_data.author = "Ax-gh)("
        const response = await api.patch(`/api/blogs/${data_id}`)
            .send(random_data)
            .expect(400)

        assert.strictEqual(response.body.status, "error")
    })

})

describe("The deletion of a random blog", () => {
    it("successfully removes the correct record", async (t) => {
        const before_delete = await get_blogs()
        const random_index = Math.floor(Math.random() * before_delete.length)
        const random_data = before_delete[random_index]
        const data_id = random_data.id

        t.diagnostic(`The id is ${data_id}`)

        await api.delete(`/api/blogs/${data_id}`)
            .expect(204)

        const after_delete = await get_blogs()
        const filtered_original = before_delete.filter(v => v.id !== data_id)

        assert.deepStrictEqual(after_delete, filtered_original)
    })
})

after(() => {
    mongoose.connection.close()
})
