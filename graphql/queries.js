const {GraphQLString, GraphQLList, GraphQLID, graphql} = require('graphql');
const { userType, postType, commentType } = require('./typedef');
const {User, Post, Comment} = require('../models');

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

const getComments = {
    type: new GraphQLList(commentType),
    description:'Get all comments',
    resolve:() => Comment.find()
}

const getCommentById = {
    type: commentType,
    description:'Get comment by Id',
    args: {
        id:{type: GraphQLID},
    },
    resolve: (_,{id}) => Comment.findById(id)
}
module.exports = {users, user, posts, post,getComments, getCommentById}