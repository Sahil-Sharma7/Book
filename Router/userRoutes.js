var express = require('express')
var router = express.Router()
var bcrypt = require('bcrypt')
var User = require('../model/userModel')
var jwt = require('jsonwebtoken')
var config = require('../config')

router.post('/signup',async(req,res) => {
    const body = req.body;
    console.log('the body is as follows ',req.body)

    if (!(body.email && body.password)) {
      return res.status(400).send({ error: "Data not formatted properly" });
    }

    const user = new User(body);

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) => res.status(201).send(doc));
})

router.post('/login',async(req,res) => {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        console.log('user here is as follows ',user)
        const accessToken  = jwt.sign(user.name,config.Secret_key)
        res.send(accessToken)


      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
})

module.exports = router;

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Register as user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 *                     email:
 *                       type: string
 *                       description: The user's email.
 *                       example: email@example.com
 *       "400":
 *         description : Data not formatted properly
 * */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in into the system
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 description: At least one number and one letter
 *             example:
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 *                     email:
 *                       type: string
 *                       description: The user's email.
 *                       example: email@example.com
 *       "400":
 *         description : Data not formatted properly
 * */
