const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const blogController = require("../controllers/blogController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )

// router.get("/getAuthorsData", authorController.getAuthorsData)

router.post("/createBlog", blogController.createBlog  )

// router.get("/getBooksData", blogController.getBooksData)

// router.get("/getBooksWithAuthorDetails", blogController.getBooksWithAuthorDetails)

module.exports = router;