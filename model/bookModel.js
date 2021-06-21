var mongoose = require('mongoose')


let bookSchema = new mongoose.Schema({
    name : {
        type : String,
        required :true,
    },
    image : {
        type : String
    },
    author : {
        type : String
    },
    description : { 
        type : String
    },
    title : {
        type :String,
        required : true
    },
    is_active : {
        type : Boolean,
        default : true
    }

})

module.exports = mongoose.model('Book',bookSchema)