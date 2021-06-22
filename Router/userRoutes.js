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