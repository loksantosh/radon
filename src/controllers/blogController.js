const authorModel = require("../models/authorModel")
const bookModel= require("../models/blogModel")

const createBlog= async function (req, res) {
    try{
    let book = req.body
    let blogCreated = await bookModel.create(book)
    res.status(201).send({data: blogCreated})
    }catch(error){
        res.status(400).send({msg : error.message})
    }
}

const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}

const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author_id')
    res.send({data: specificBook})

}

module.exports.createBlog= createBlog
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
