const {GraphQLString, GraphQLList, GraphQLID, graphql} = require('graphql');
const { userType, postType } = require('./typedef');
const {User, Post} = require('../models');

/* const hello = {
    type:GraphQLString,
    description:'Returns string',
    resolve:() => 'Hello World'
}
 */

const users = {
    type: new GraphQLList(userType),
    async resolve() {
       return await User.find({});
    }
}

const user = {
    type: userType,
    description:'Get user by id',
    args:{
        id: {type: GraphQLID}
    },
     async resolve (_, args) {
        return await User.findById(args.id);
        
    }
}

const posts = {
    type: new GraphQLList(postType),
    async resolve() {
        return await Post.find();
    }
}

const post = {
    type: postType,
    description: 'Returns post by id',
    args: {
        id: {type:GraphQLID}
    },
    async resolve (parent, args) {
        return await Post.findById(args.id);
    }
}
module.exports = {users, user, posts, post}