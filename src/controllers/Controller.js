const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel= require("../models/publisherModel")


const createAuthor= async  (req, res) => {
    let author = req.body
    let authorCreated = await authorModel.create(author)
    res.send({data: authorCreated})
}

const createPublisher= async  (req, res) => {
    let publisher= req.body
    let publisherCreated = await publisherModel.create(publisher)
    res.send({data: publisherCreated})
}

const createBook= async  (req, res) => {
    let book = req.body
    let checkAuthor=req.body.author
    let checkPublisher=req.body.publisher
   if(!checkAuthor ||!checkPublisher) res.send({msg: "Error Id is Mandatory"})
let authorId= await authorModel.findById(checkAuthor)
 if(!authorId) res.send({msg:"AuthorID not found"})
let publisherId= await publisherModel.findById(checkPublisher)
if(!publisherId) res.send({msg:"PublisherID not found"})
else {let bookCreated = await bookModel.create(book) 
    res.send({data: bookCreated})}
}


const getBooksData= async (req, res)=> {
    let books = await bookModel.find().populate(['author' ,'publisher' ])
    res.send({data: books})
}



const updateBooksData= async  (req, res)=> {

    let publisherid = await publisherModel.find({publisherName:{$in :["Penguin","HarperCollins"]}}).select("_id")
     let bookCover= await bookModel.updateMany({publisher : publisherid} ,{$set :{isHardCover:true}})
            
      
    let authors = await authorModel.find({rating : {$gt :3.5}}).select({_id:1})
   let books =await bookModel.updateMany( {author :authors},{$inc:{price:10}})
             res.send({data:books})
}

// const createBook= async function (req, res) {
//     let book=req.body
//     let booksData = await bookModel.create(book)
//     res.send({data: booksData})
// }




module.exports.createAuthor=createAuthor
module.exports.createPublisher=createPublisher
module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.updateBooksData= updateBooksData
// module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
