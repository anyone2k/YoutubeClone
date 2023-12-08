// External imports
const jwt = require('jsonwebtoken');

// Internal imports
const User = require('../models/User');
const SECRET_KEY = process.env.SECRET_KEY;

exports.protect = (req, res, next) => {
    try{
    let token = req.headers.authorization;
    
    if(token === undefined){
        
        return res.status(401).send('Not authorized to access this route / Invalid Token');
    }
    
    if(!token.startsWith('Bearer')){
        return res.status(401).send('Not authorized to access this route / Invalid Token');
    }

    token = token.split(' ')[1];
    const tokenDecoded = jwt.verify(token, SECRET_KEY);
    
    req.id = tokenDecoded.id;
    
    if(User.find(req.id) === null){
        
        return res.status(401).send('Not authorized to access this route / Invalid Token');
    }
    next();
}catch(error){
    return res.status(401).send('Not authorized to access this route / Invalid Token');
}
}

exports.isAdmin = (req, res, next) => {
    const id = req.id;

    const user = User.findById(id);
    try {
        if(user === undefined){
            return res.status(401).send('Not authorized to access this route / Invalid Token');
        }
        if(!user.isAdmin){
            return res.status(401).send('Not authorized to access this route / Invalid Token');
        }
        next();
    } catch (error) {
        return res.status(401).send('Not authorized to access this route / Invalid Token');
    }

}