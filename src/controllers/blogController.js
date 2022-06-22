const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")


const createBlog = async (req, res) => {
    try {
        let Blog = req.body
        if(!Blog.title) return res.status(400).send({msg: " title is required "})
        if(!Blog.body) return res.status(400).send({msg: "body is required "})
        if(!Blog.authorId) return res.status(400).send({msg: " authorId is required "})
        if(!Blog.category) return res.status(400).send({msg: " category is requirBlog"})
        let blogCreated = await blogModel.create(Blog)
        
        res.status(201).send({ data: blogCreated })
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

const getBlogsData = async (req, res) => {
    try {

        let input = req.query.authorId
        if (input) {
            let categorySelected = req.query.category
            let blogsData = []
            let blogs = await blogModel.find({ authorId: input })
            if (!blogs) return res.status(404).send({ msg: "no blog found" })
            blogs.filter(n => {
                n.category = categorySelected
                if (n.isDeleted == false && n.isPublished == true)
                    blogsData.push(n)
            })
            return res.status(200).send({ data: blogsData })
        }
        else {
            let blogs = await blogModel.find({ isDeleted: false, isPublished: true })
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

        let date = Date.now()
        let blogs = await blogModel.findOneAndUpdate({ _id: req.params.blogId },
            { $set: { title: title, body: body, isPublished: true, publishedAt: date } }, { new: true })

       if(tags || subCategory){ blogs.tags.push(tags)
        blogs.subCategory.push(subCategory)
    }

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