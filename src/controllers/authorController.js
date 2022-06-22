const AuthorModel = require("../models/authorModel")

const createAuthor = async function (req, res) {
    try {
        let author = req.body
        let authorCreated = await AuthorModel.create(author)
        if(!authorCreated) return res.status(400).send({msg:""})
        res.status(201).send({ data: authorCreated })
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}



module.exports.createAuthor = createAuthor
