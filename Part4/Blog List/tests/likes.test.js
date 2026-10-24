import { test, describe } from "node:test"
import assert from "node:assert"
import { like_sum, fav_blog, most_blogs, most_likes } from "../utils/list_helper.js"

const test_spaces = {
    empty: [],

    single: [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0

        }
    ],

    multiple_diff_likes: [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        },
        {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
        },
        {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
        }
    ],

    multiple_same_likes: [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 20,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 6,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 6,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        },
        {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 20,
            __v: 0
        },
        {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
        }
    ],
}

describe("Total sum of likes in", () => {

    test("empty input", () => {
        const blogs = test_spaces.empty

        assert.strictEqual(like_sum(blogs), 0)
    })

    test("single input", () => {
        const blogs = test_spaces.single

        assert.strictEqual(like_sum(blogs), 5)
    })

    test("large input", () => {
        const blogs = test_spaces.multiple_diff_likes

        assert.strictEqual(like_sum(blogs), 36)
    })

})

describe("Fav post in", () => {

    test("empty input", () => {
        const blogs = test_spaces.empty

        assert.deepStrictEqual(fav_blog(blogs), undefined)
    })

    test("single input", () => {
        const blogs = test_spaces.single

        assert.deepStrictEqual(fav_blog(blogs), blogs[0])
    })

    test("large input with one top post", () => {
        const blogs = test_spaces.multiple_diff_likes

        assert.deepStrictEqual(fav_blog(blogs), blogs[2])
    })

    test("large input with multiple top posts", () => {
        const blogs = test_spaces.multiple_same_likes

        const result = fav_blog(blogs).author

        const valid_ans = ["Robert C. Martin", "Edsger W. Dijkstra"]

        assert.strictEqual(valid_ans.indexOf(result) !== -1, true)
    })

})

describe("Most active author in", () => {

    test("empty input", () => {
        const blogs = test_spaces.empty

        assert.deepStrictEqual(most_blogs(blogs), { author: "", blogs: -1 })
    })

    test("single input", () => {
        const blogs = test_spaces.single

        assert.deepStrictEqual(most_blogs(blogs), { author: 'Edsger W. Dijkstra', blogs: 1 })
    })

    test("large input with one top post", () => {
        const blogs = test_spaces.multiple_diff_likes

        assert.deepStrictEqual(most_blogs(blogs), { author: "Robert C. Martin", blogs: 3 })
    })

    test("large input with multiple top posts", () => {
        const blogs = test_spaces.multiple_same_likes

        const result = most_blogs(blogs)

        const valid_ans = [
            {
                author: "Robert C. Martin",
                blogs: 3,
            },
            {
                author: "Edsger W. Dijkstra",
                blogs: 3,
            },
        ]

        const hasRes = valid_ans.some(obj => {
            try {
                assert.deepStrictEqual(result, obj)
                return true
            }
            catch {
                return false
            }
        })

        assert.ok(hasRes, "doesn't find the actual count of blogs.")
    })

})

describe("Most liked author in", () => {

    test("empty input", () => {
        const blogs = test_spaces.empty

        assert.deepStrictEqual(most_likes(blogs), { author: "", likes: -1 })
    })

    test("single input", () => {
        const blogs = test_spaces.single
        assert.deepStrictEqual(most_likes(blogs), { author: 'Edsger W. Dijkstra', likes: 5 })
    })

    test("large input with one top post", () => {
        const blogs = test_spaces.multiple_diff_likes

        assert.deepStrictEqual(most_likes(blogs), { author: "Edsger W. Dijkstra", likes: 17 })
    })

    test("large input with multiple top posts", () => {
        const blogs = test_spaces.multiple_same_likes

        const result = most_likes(blogs)

        const valid_ans = [
            {
                author: "Robert C. Martin",
                likes: 32,
            },
            {
                author: "Edsger W. Dijkstra",
                likes: 32,
            },
        ]

        const hasRes = valid_ans.some(obj => {
            try {
                assert.deepStrictEqual(result, obj)
                return true
            }
            catch {
                return false
            }
        })

        assert.ok(hasRes, "doesn't find the actual likes of blogs.")
    })

})
