// External imports
const jwt = require('jsonwebtoken');

// Internal imports
const User = require('../models/User');

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
    const tokenDecoded = jwt.verify(token, '52e4d52f23d204d418ad64c33c095051b2430322a2a47d8b378aede350661a21bf0c3c33991a998ff5314bc053d3ce66')
    
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