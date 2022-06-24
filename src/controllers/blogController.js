const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")



const createBlog = async (req, res) => {
    try {
        let Blog = req.body
        if (Object.keys(author).length == 0) {
            return res.status(400).send({ status: false, msg: "Invalid request Please provide valid Author  details" });
        }
        if (!Blog.title) return res.status(400).send({ msg: " title is required " })
        if (!Blog.body) return res.status(400).send({ msg: "body is required " })
        if (!Blog.authorId) return res.status(400).send({ msg: " authorId is required " })
        if (!Blog.category) return res.status(400).send({ msg: " category is require" })
        let blogCreated = await blogModel.create(Blog)

        res.status(201).send({ status: true, data: blogCreated })
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}



const getBlogsData = async (req, res) => {
    try {

        let input = req.query.authorId
        let categorySelected = req.query.category
        if (input) {

            let blogsData = []
            let blogs = await blogModel.find({ authorId: input, category: categorySelected }).populate('Author')
            if (!blogs) return res.status(404).send({ msg: "no blog found" })
            blogs.filter(n => {

                if (n.isDeleted == false && n.isPublished == true)
                    blogsData.push(n)
            })
            return res.status(200).send({ data: blogsData })
        }
        else {
            let blogs = await blogModel.find({ isDeleted: false, isPublished: true }).populate('Author')
            return res.status(200).send({ data: blogs })
        }

    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}





const updateBlog = async (req, res) => {
    try {
        let title = req.body.title
        let body = req.body.body
        let tags = req.body.tags
        let subCategory = req.body.subCategory

        if (Object.keys(author).length == 0) {
            return res.status(400).send({ status: false, msg: "Invalid request Please provide valid Author  details" });
        }

        let date = Date.now()
        let blogs = await blogModel.findOneAndUpdate({ _id: req.params.blogId },
            { $set: { title: title, body: body, isPublished: true, publishedAt: date }, $push: { tags: tags, subCategory: subCategory } }, { new: true })


        if (!blogs) return res.status(404).send({ msg: "no blog found" })
        res.status(200).send({ msg: blogs })
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}


const deleteBlog = async (req, res) => {
    try {
        let inputId = req.params.blogId
        let date = Date.now()
        if (Object.keys(author).length == 0) {
            return res.status(400).send({ status: false, msg: "Invalid request Please provide valid Author  details" });
        }
        
        let data = await blogModel.findOneAndUpdate({ _id: inputId },
            { $set: { isDeleted: true, deletedAt: date } }, { new: true })
        if (!data) return res.status(404).send({ msg: "no data found" })
        res.status(200).send({ status: true, msg: data })
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}


const deleteBlogQuery = async (req, res) => {
    try {
        let authorId = req.query.authorId
        let category = req.query.category
        let tags = req.query.tags
        let subCategory = req.query.subCategory
        let isPublished = req.query.boolean
        let date = Date.now()

        if (Object.keys(author).length == 0) {
            return res.status(400).send({ status: false, msg: "Invalid request Please provide valid Author  details" });
        }

        let blogs = await blogModel.updateMany({ category: category, authorId: authorId, tags: tags, subcategory: subCategory, isPublished: isPublished },
            { $set: { isDeleted: true, deletedAt: date } }, { new: true })
            
        if (!blogs) return res.status(404).send({ msg: "no data found" })
        res.status(200).send({ status: true, msg: blogs })
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

module.exports.createBlog = createBlog
module.exports.getBlogsData = getBlogsData
module.exports.updateBlog = updateBlog
module.exports.deleteBlog = deleteBlog
module.exports.deleteBlogQuery = deleteBlogQuery
