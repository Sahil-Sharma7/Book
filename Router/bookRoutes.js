var express = require('express')
var router = express.Router()
var Book = require('../model/bookModel')
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
    res.status(200).send(books)
})

router.get('/book',async(req,res) => {
    const book = await Book.find({_id : req.query.id})
    res.status(200).send(book)
})

router.get('/delete',async(req,res) => {
    await Book.remove({_id : req.query.id})
    res.status(200).send('Book Deleted Successfully')
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
    res.status(200).send("Book Saved Successfully")
 });

router.post('/update',upload.single("demo_image"),async(req,res) => {
    let obj = req.body
    if(req.file){
        obj.image = req.file.originalname
    }
    const book = await Book.updateOne({_id:req.query.id},obj)
    console.log('book',book)
    res.status(200).send('Book Updated Successfully')  
})

module.exports = router;
      
/**
 * @swagger
 * /book/:
 *   get:
 *     summary: Retrieve a list of books .
 *     tags: [Book]
 *     description: Retrieve a list of books.
 *     security:
 *      - jwt: [] 
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The book ID.
 *                         example: 60d191cd7d0739451
 *                       name:
 *                         type: string
 *                         description: The book's name.
 *                         example: First Family
 *                       image:
 *                          type: string
 *                          description : The image of book
 *                          example : first_family.jpg
 *                       author:
 *                          type: string
 *                          description : Author of book
 *                          example : David
 *                       title:
 *                         type: string
 *                         description: The book's title.
 *                         example: First Family
 */

/**
 * @swagger
 * /book/book:
 *   get:
 *     summary: Retrieve a specific book.
 *     tags: [Book]
 *     description: Retrieve a specific book.
 *     security:
 *      - jwt: [] 
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *           description: The id of book to retrieve it's data
 *     responses:
 *       200:
 *         description: A specific book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The book ID.
 *                   example: 60d191cd7d0739451
 *                 name:
 *                   type: string
 *                   description: The book's name.
 *                   example: First Family
 *                 image:
 *                   type: string
 *                   description : The image of book
 *                   example : first_family.jpg
 *                 author:
 *                   type: string
 *                   description : Author of book
 *                   example : David
 *                 title:
 *                   type: string
 *                   description: The book's title.
 *                   example: First Family
 */

/**
 * @swagger
 * /book/delete:
 *   get:
 *     summary: Delete a book form books .
 *     tags: [Book]
 *     description: Delete a book form books.
 *     security:
 *      - jwt: [] 
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *           description: Id of book to be deleted from books
 *     responses:
 *       200:
 *         description: Book deleted Successfully.
 *  
 */


/**
 * @swagger
 * /book/:
 *   post:
 *     summary: Save a book
 *     tags: [Book]
 *     security:
 *      - jwt: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - title
 *             properties:
 *               name:
 *                 type: string
 *                 description: The book's name.
 *                 example: First Family
 *               image:
 *                 type: file
 *                 description : The image of book
 *                 example : first_family.jpg
 *               author:
 *                 type: string
 *                 description : Author of book
 *                 example : David
 *               title:
 *                 type: string
 *                 description: The book's title.
 *                 example: First Family
 *               description:
 *                 type: string
 *                 example: Great Book
 *     responses:
 *       "201":
 *         description: Book Saved Successfully
 * */

/**
 * @swagger
 * /book:
 *   post:
 *     summary: Update information of a book
 *     tags: [Book]
 *     security:
 *      - jwt: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The book's name.
 *                 example: First Family
 *               image:
 *                 type: file
 *                 description : The image of book
 *                 example : first_family.jpg
 *               author:
 *                 type: string
 *                 description : Author of book
 *                 example : David
 *               title:
 *                 type: string
 *                 description: The book's title.
 *                 example: First Family
 *               description:
 *                 type: string
 *                 example: Great Book
 *     responses:
 *       "201":
 *         description: Book Updated Successfully
 * */