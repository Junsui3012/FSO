import { test, describe } from "node:test"
import assert from "node:assert"
import { dummy } from "../utils/list_helper.js"

describe("Basic testing", () => {
    test("dummy on empty", () => {
        const blogs = []

        assert.strictEqual(dummy(blogs), 1)
    })

    test("dummy on record present", () => {
        const blogs = [{
            title: "bad",
            author: "worse",
            url: "worst",
            id: "none",
            likes: -1,
        }]

        assert.strictEqual(dummy(blogs), 1)
    })
})
