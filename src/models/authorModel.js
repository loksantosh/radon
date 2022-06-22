const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const authorSchema = new mongoose.Schema({

    Fname: {
        type: String,
        required: true
    },
    Lname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        enum: ['Mr', 'Mrs', 'Miss']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    password: {
        type: ObjectId,
        required: true
    },

    address: String

}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema)
