const express = require('express');
const router = express.Router();

const Controller= require("../controllers/Controller")



router.post("/createAuthor", Controller.createAuthor  )
router.post("/createPublisher", Controller.createPublisher )
router.post("/createBook", Controller.createBook  )

router.get("/getBooksData", Controller.getBooksData)
router.put("/updateBooksData", Controller.updateBooksData)

// router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

module.exports = router;