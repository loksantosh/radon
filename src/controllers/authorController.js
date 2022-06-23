const AuthorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken")

const createAuthor = async function (req, res) {
    try {
        let author = req.body
        if (!author.Fname) return res.status(400).send({ msg: " First name is required " })
        if (!author.Lname) return res.status(400).send({ msg: " Last name is required " })
        if (!author.email) return res.status(400).send({ msg: " email is required " })
        if (!author.password) return res.status(400).send({ msg: " password is required " })

        let authorCreated = await AuthorModel.create(author)
        res.status(201).send({ data: authorCreated })
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}


const loginAuthor = async function (req, res) {
    try {
        let email = req.body.email
        let password = req.body.password

        if (!email) return res.status(400).send({ msg: " email is required " })
        if (!password) return res.status(400).send({ msg: "  password is required " })


        let loggedAuthor = await AuthorModel.findOne({ email: email, password: password })
        if (!loggedAuthor) return res.status(404).send({ msg: "Email or Password is Incorrect!" })

       


        let token = jwt.sign(
            {
                authorId: loggedAuthor._id.toString(),
                batch: "Radon",
                project: "Blog-Project"
            },
            "Excellence Over Success"
        )
        res.setHeader("x-api-key", token)
        res.status(200).send({ msg: "User logged in successfully!", loggedAuthor, token })
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}


module.exports.createAuthor = createAuthor
module.exports.loginAuthor = loginAuthor
