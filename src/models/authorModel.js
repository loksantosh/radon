const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const authorSchema = new mongoose.Schema({

    Fname: {
        type: String,
        required: true,
        trim :true
    },
    Lname: {
        type: String,
        required: true,
        trim :true
    },
    title: {
        type: String,
        required:true,
        enum: ['Mr', 'Mrs', 'Miss'],
        trim :true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        trim:true
    },
    password: {
        type: String,
        required: true,
        trim:true
    },

   

}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema)
