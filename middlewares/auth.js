const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    try {
        const verified = jwt.verify(token,'secret123');
        req.verified = verified.user;
        next();
    } catch (error) {
        console.log(error);
        next();
    }
    
    
    
    
}



module.exports = { authenticate }