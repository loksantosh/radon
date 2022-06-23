const express = require('express');  //helps nodejs to build web application.
const bodyParser = require('body-parser');  //required bodyParser, data on frontend is converted to JSON.
const route = require('./routes/route.js');  //requiring route from route.js
const { default: mongoose } = require('mongoose'); //required mongoose, helps connect nodejs to mongodb.
const app = express();

app.use(bodyParser.json()); //converts data to JSON format.
app.use(bodyParser.urlencoded({ extended: true })); //can contain any value including String, Number etc. 


mongoose.connect("mongodb+srv://aashrun7:aashrunmongodb@aashrun.znkqsjb.mongodb.net/BlogPost-DB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route); //middleware


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000)) 
});
