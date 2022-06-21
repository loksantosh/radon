const authorModel = require("../models/authorModel")
const bookModel= require("../models/blogModel")

const createBlog= async function (req, res) {
    let book = req.body
    let bookCreated = await bookModel.create(book)
    res.status(201).send({data: blogCreated})
}

const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}

const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author_id')
    res.send({data: specificBook})

}

module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
