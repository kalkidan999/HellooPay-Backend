const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const app = express()

const mongoURI = `${process.env.MONGODB_URL}`
mongoose.connect(mongoURI,
                {useNewUrlParser:true},
                ()=> console.log('connected to db'))

app.set('port', PORT)

app.get('/', function(req, res, next){
    res.send('hello there');
})

// define routes
const hc_api_routes = require('./routes/hc_api_routes')

//call middlewares
app.use(express.json());
app.use('/v1', hc_api_routes)


//listen to server
app.listen(app.get('port'), function(){
    console.log(`app listening on port ${PORT}`)
})