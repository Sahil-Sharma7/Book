var express = require('express')
var app = express()
var router = require('./Router/appRoutes')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/Book')


app.use('/',router)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));  
app.use('/uploads', express.static('uploads')); 





app.listen(8000,() => {
    console.log('The app is running at 8000')
})