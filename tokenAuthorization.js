const jwt = require('jsonwebtoken');
var config = require('./config')

module.exports = async function auth(req,res,next){
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,config.Secret_key,async(err,user) => {
            if(err){ res.status(403).send('Invalid token')  }
            console.log('Token is verified')
        }) }
    else{res.status(401).send('Autorization token not found')
    }
    next()
}