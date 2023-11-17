const { GraphQLString } = require("graphql");
const {User} = require('../models');
const {createJWT} =  require('../util/auth');

const register = {
    type: GraphQLString,
    description: 'Register a new user and returns token',
    args:{
        username:{ type: GraphQLString},
        email: { type: GraphQLString},
        password: { type: GraphQLString},
        displayName:{ type: GraphQLString}
    },
    async resolve(_,args) {
        const {username, email, password, displayName} = args;
        const newUser = new User({username, email, password, displayName});
        await newUser.save();
        const token = createJWT({_id: newUser._id, username: newUser.username, email:newUser.email});
        return token;
    }
}

const login = {
    type: GraphQLString,
    args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString}
    },
    async resolve(_, args) {
       const user = await User.findOne({email:args.email}).select('+password');
       if(!user || args.password !== user.password) {
        throw new Error('Invalid Credentials');
       } 
       const token = createJWT({_id: user._id, username: user.username, email:user.email});
       console.log(token);
       return token;
    }
} 

module.exports = {register, login}