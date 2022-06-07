const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")



// router.post("/createUser", UserController.createUser  )

// router.get("/getUsersData", UserController.getUsersData)

router.post("/createBook", BookController.createBook  )

router.get("/getBooksList", BookController.bookList)
router.post("/getBooksInYear", BookController.BooksInYear)
router.post("/getParticularBooks", BookController.ParticularBooks)
router.get("/getXINRBooks", BookController.XINRBooks)
router.get("/getRandomBooks", BookController.RandomBooks)


module.exports = router;