const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema( {
    publisherName: String,
    headQuater:String


}, { timestamps: true });

module.exports = mongoose.model(' newPublisher', publisherSchema)