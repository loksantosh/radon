const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")
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

const getBlogsData= async function (req, res) {
    try{
    let input=req.query.givenId
    let blogs = await blogModel.findById({authorId :givenId})
    let check= blogs.isDeleted
    if(!check) return res.status(200).send({data: blogs})
    }
    catch(error){
        res.status(404).send({msg:"Data not fond"})
    }
}

const updateBlog= async (req,res)=>{
    try{
    let title=req.body.title
    let body =req.body.body
    let tags=req.body.tags
    let inputId =req.params.BlogId
    let blogs = await blogModel.updateMany({_id:inputId} ,
        {$set:{title:title, body:body, tags:tags, isPublished:true , publishedAt:Date.now }},{new:true})
        res.status(200).send({msg:blogs})
    }
    catch(error){
        res.status(404).send({msg:"Data not fond"})
    }
}

const deleteBlog= async (req,res)=>{
    try{
    let inputId= req.params.BlogId
    let data= await blogModel.findOneAndUpdate({_id:inputId} ,
        {$set:{isDeleted:true , deletedAt:Date.Now}},{new:true})
    }
    catch(error){
        res.status(404).send({msg:"Data not fond"})
    }
}

const deleteBlogQuery = async(req, res) =>{

}

module.exports.createBlog= createBlog
module.exports.getBlogsData= getBlogsData
module.exports.updateBlog= updateBlog
module.exports.deleteBlog= deleteBlog
