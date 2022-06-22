const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")


const createBlog = async (req, res) => {
    try {
        let blog = req.body
        let blogCreated = await blogModel.create(blog)
        res.status(201).send({ data: blogCreated })
    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
}

const getBlogsData = async (req, res) => {
    try {

        let input = req.query.givenId
        let categorySelected = req.query.category
        let blogsData = []
        let blogs = await blogModel.find({ authorId: input })
        blogs.filter(n => {
            n.category = categorySelected
            if (n.isDeleted == false && n.isPublished == true)
                blogsData.push(n)
        })
        return res.status(200).send({ data: blogsData })

    }
    catch (error) {
        res.status(404).send({ msg: "Data not fond" })
    }
}

const updateBlog = async (req, res) => {
    try {
        let title = req.body.title
        let body = req.body.body
        let tags = req.body.tags
        let date = Date.now()
        let blogs = await blogModel.findOneAndUpdate({ _id: req.params.blogId },
            { $set: { title: title, body: body, tags: tags, isPublished: true, publishedAt: date } }, { new: true, upsert: true })
        res.status(200).send({ msg: blogs })
    }
    catch (error) {
        res.status(404).send({ msg: "Data not fond" })
    }
}

const deleteBlog = async (req, res) => {
    try {
        let inputId = req.params.blogId
        let date = Date.now()
        let data = await blogModel.findOneAndUpdate({ _id: inputId },
            { $set: { isDeleted: true, deletedAt: date } }, { new: true, upsert: true })
        res.status(200).send({ status: true, msg: data })
    }
    catch (error) {
        res.status(404).send({ msg: "Data not fond" })
    }
}


const deleteBlogQuery = async (req, res) => {
    try {
        let inputId = req.query.blog
        let category = req.query.category
        let tags = req.query.tags
        let subCategory = req.query.subCategory
        let isPublished = req.query.boolean

        let date = Date.now()
        let data = await blogModel.updateMany({ authorId: inputId, category: category, tags: tags, subcategory: subCategory, isPublished: isPublished },
            { $set: { isDeleted: true, deletedAt: date } }, { new: true, upsert: true })
        res.status(200).send({ status: true, msg: data })
    }
    catch (error) {
        res.status(404).send({ msg: "Data not fond" })
    }
}

module.exports.createBlog = createBlog
module.exports.getBlogsData = getBlogsData
module.exports.updateBlog = updateBlog
module.exports.deleteBlog = deleteBlog
module.exports.deleteBlogQuery = deleteBlogQuery