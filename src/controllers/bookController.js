const { count } = require("console")
const BookModel= require("../models/bookModel")

   const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}


    const bookList= async function (req, res) {
 let allBooks = await BookModel.find().select({bookName: 1, authorName: 1, _id: 0})
   res.send({msg: allBooks})
     }

     
     const BooksInYear= async function (req, res) {
        let years=req.body.year
         let allBooks = await BookModel.find({year : years})
          res.send({msg: allBooks})
           }
     
     
     
     const ParticularBooks= async function (req, res) {
        let book=req.body
         let allBooks = await BookModel.find(book)
          res.send({msg: allBooks})
           }
       

           const XINRBooks= async function (req, res) {
            let allBooks = await BookModel.find({"prices.indianPrice" : {$in:["100INR","200INR","500INR"]}})
              res.send({msg: allBooks})
               }

            
         
           const RandomBooks= async function (req, res) {
                    let allBooks = await BookModel.find({ $or:[{stockAvailable:true}, {totalPages :{ $gt:500 }}]} )
                            
                      res.send({msg: allBooks})
                        }






module.exports.createBook= createBook
module.exports.bookList= bookList
module.exports.BooksInYear= BooksInYear
module.exports.XINRBooks= XINRBooks
module.exports.RandomBooks= RandomBooks
module.exports.ParticularBooks= ParticularBooks