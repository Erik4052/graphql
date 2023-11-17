const { GraphQLSchema, graphql, GraphQLObjectType, GraphQLString } = require('graphql');
const { hello } = require('./queries');
const { register, login } = require('../graphql/mutations');

const RootType = new GraphQLObjectType({
    name: 'RootType',
    description: 'The root query type',
    fields: {
        //hello
    }
});

const mutationType = new GraphQLObjectType({
    name: "MutationType",
    description: 'The root mutation type',
    fields: {
        register,
        login
    }
});

module.exports = new GraphQLSchema({
    query: RootType,
    mutation: mutationType
});
