const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const bookSchema = new mongoose.Schema( {
    bookName:{type:String,
    required:true,
     unique:true} ,
    authorName: {type:String,
    required:true},
     category: {
        type: String,
        enum: ["fiction", "nonfiction"] 
    },
    year: Number ,
    
}, { timestamps: true });

module.exports = mongoose.model('book', bookSchema) 



// String, Number
// Boolean, Object/json, array