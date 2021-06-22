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
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,config.Secret_key,async(err,user) => {
            if(err){ res.status(403).send('Invalid token')  }
            const books = await Book.find({})
            res.send(books)
        }) }
    else{res.status(401).send('Autorization token not found')
    }
})
router.get('/book',async(req,res) => {
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,config.Secret_key,async(err,user) => {
            if(err){ res.status(403).send('Invalid token')  }
            const book = await Book.find({_id : req.query.id})
            res.send(book)
        }) }
    else{res.status(401).send('Autorization token not found')
    }
})
router.get('/delete',async(req,res) => {
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,config.Secret_key,async(err,user) => {
            if(err){ res.status(403).send('Invalid token')  }
            await Book.remove({_id : req.query.id})
            res.send('Book Deleted Successfully')
        }) }
    else{res.status(401).send('Autorization token not found')
    }
    
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
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,config.Secret_key,async(err,user) => {
            if(err){ res.status(403).send('Invalid token')  }
            
            const savedBook = newBook.save()
           res.send("Book Saved Successfully")
        }) }
    else{res.status(401).send('Autorization token not found')
    }

    
 });

router.post('/update',upload.single("demo_image"),async(req,res) => {
    let obj = req.body
    if(req.file){
        obj.image = req.file.originalname
    }
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,config.Secret_key,async(err,user) => {
            if(err){ res.status(403).send('Invalid token')  }
            const book = await Book.updateOne({_id:req.query.id},obj)
    console.log('book',book)
    res.send('Book Updated Successfully')
        }) }
    else{res.status(401).send('Autorization token not found')
    }
    
    
})


module.exports = router;