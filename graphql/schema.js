const { GraphQLSchema, graphql, GraphQLObjectType, GraphQLString } = require('graphql');
const { users, user, posts, post} = require('./queries');
const { register, login, createPost, updatePost } = require('../graphql/mutations');

const RootType = new GraphQLObjectType({
    name: 'RootType',
    description: 'The root query type',
    fields: {
        //hello
        users,
        user,
        posts,
        post
    }
});

const mutationType = new GraphQLObjectType({
    name: "MutationType",
    description: 'The root mutation type',
    fields: {
        register,
        login,
        createPost,
        updatePost
    }
});

module.exports = new GraphQLSchema({
    query: RootType,
    mutation: mutationType
});
