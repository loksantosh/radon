const AuthorModel = require("../models/authorModel")

const createAuthor = async function (req, res) {
    try {
        let author = req.body
        if(!author.Fname) return res.status(400).send({msg: " First name is required "})
        if(!author.Lname) return res.status(400).send({msg: " Last name is required "})
        if(!author.email) return res.status(400).send({msg: " email is required "})
        if(!author.password) return res.status(400).send({msg: " password is required "})
    s
        let authorCreated = await AuthorModel.create(author)
        res.status(201).send({ data: authorCreated })
    } catch (error) {
        res.status(500).send({ msg: error})
    }
}



module.exports.createAuthor = createAuthor
