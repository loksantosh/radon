const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")


const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
const mController = require("../middleware/middleware")




router.post("/createAuthor", authorController.createAuthor)

router.post("/createBlog", blogController.createBlog)

router.get("/getBlogsData",mController.authenticate, blogController.getBlogsData)

router.put("/updateBlog/:blogId", mController.authorize, blogController.updateBlog)

router.delete("/deleteBlog/:blogId", mController.authorize, blogController.deleteBlog)

router.delete("/deleteBlogQuery", mController.authorize, blogController.deleteBlogQuery)

router.post("/loginAuthor", authorController.loginAuthor)


module.exports = router;



