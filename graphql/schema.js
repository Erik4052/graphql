const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { users, user, posts, post,getComments, getCommentById} = require('./queries');
const { register, login, createPost, updatePost, deletePost, createComment,updateComment, deleteComment } = require('../graphql/mutations');

const RootType = new GraphQLObjectType({
    name: 'RootType',
    description: 'The root query type',
    fields: {
        //hello
        users,
        user,
        posts,
        post,
        getComments,
        getCommentById
    }
});

const mutationType = new GraphQLObjectType({
    name: "MutationType",
    description: 'The root mutation type',
    fields: {
        register,
        login,
        createPost,
        updatePost,
        deletePost,
        createComment,
        updateComment,
        deleteComment
    }
});

module.exports = new GraphQLSchema({
    query: RootType,
    mutation: mutationType
});
