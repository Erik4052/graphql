const jwt = require('jsonwebtoken');

const createJWT = (user) => {
   return jwt.sign({user}, 'secret123',{ expiresIn:'1h'});
}

module.exports = {createJWT}
