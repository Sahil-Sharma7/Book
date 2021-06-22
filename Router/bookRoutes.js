var express = require('express')
var router = express.Router()
var Book = require('../model/bookModel')
const jwt = require('jsonwebtoken');
var config = require('../config')
var multer = require('multer');
var storage = multer.diskStorage({
    destination: './uploads/',
    filename : function (req,file,cb){
        cb(null,file.originalname)
    }

})
const upload = multer({storage:storage});

router.get('/',async(req,res) => {
    const books = await Book.find({})
    res.send(books)
})
router.get('/book',async(req,res) => {
    const book = await Book.find({_id : req.query.id})
    res.send(book)
})
router.get('/delete',async(req,res) => {
    await Book.remove({_id : req.query.id})
    res.send('Book Deleted Successfully')
    
})

router.post("/",upload.single("demo_image"), (req, res) => {
    const newBook = new Book({
        name : req.body.name,
        image: req.file.originalname,
        author: req.body.author,
        description : req.body.author,
        title: req.body.title,
        is_active : req.body.is_active,
    })
    const savedBook = newBook.save()
    res.send("Book Saved Successfully")
    
 });

router.post('/update',upload.single("demo_image"),async(req,res) => {
    let obj = req.body
    if(req.file){
        obj.image = req.file.originalname
    }
    const book = await Book.updateOne({_id:req.query.id},obj)
    console.log('book',book)
    res.send('Book Updated Successfully')
    
    
})


module.exports = router;