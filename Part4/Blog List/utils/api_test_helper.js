import BlogModel from "../models/BlogModel.js"
import UserModel from "../models/UserModel.js"

export const initial_blog_data = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        user: "6ae5990f0b91826cbb582688",
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 20,
        user: "6ae5990f0b91826cbb582688",
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 6,
        user: "6ae5990f0b91826cbb582688",
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 6,
        user: "6ae5990f0b91826cbb582688",
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        user: "6ae5990f0b91826cbb582688",
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 20,
        user: "6ae5990f0b91826cbb582688",
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        user: "6ae5990f0b91826cbb582688",
    }
]

export const initial_user_data = [
    {
        username: "Asuka",
        passwordHash: "$90Polymath",
    },
    {
        username: "yuki.Nomad",
        passwordHash: "69AllNight!",
    },
    {
        username: "Its_Steve",
        passwordHash: "Wine&Beer10",
    },
    {
        username: "IshiGummy",
        passwordHash: "@N3rdyB4ll5",
    },
]

export const get_blogs = async () => {
    const data = await BlogModel.find({}).populate("user")
    return data.map(v => v.toJSON())
}

export const get_users = async () => {
    const users = await UserModel.find({})
    return users.map(v => v.toJSON())
}
