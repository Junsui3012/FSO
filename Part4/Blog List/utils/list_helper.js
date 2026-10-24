import _ from "lodash"

export const dummy = (blogs) => {
    if (blogs) return 1
    return 0
}

export const like_sum = (blogs) => {
    let likes = 0
    for (const blog of blogs) likes += blog.likes
    return likes
}

export const fav_blog = (blogs) => {
    if (blogs.length === 0) return undefined
    return blogs.reduce((top_blog, cur_blog) => cur_blog.likes > top_blog.likes ? cur_blog : top_blog)
}

export const most_blogs = (blogs) => {
    const author_count = _.countBy(blogs, post => post.author)
    const topUploader = _.reduce(author_count, (max, val, key) => {
        return (val > max.blogs) ? { author: key, blogs: val } : max
    }, { author: "", blogs: -1 })

    return topUploader
}

export const most_likes = (blogs) => {
    const grouped_blogs = _.groupBy(blogs, (v) => v.author)
    const top_blog = _.reduce(grouped_blogs, (max, blogList, author) => {
        let likes = 0
        _.forEach(blogList, (v) => { likes += v.likes })
        return (likes > max.likes) ? { author, likes } : max
    }, { author: "", likes: -1 })

    return top_blog
}
