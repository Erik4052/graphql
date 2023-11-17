const {GraphQLString} = require('graphql');

const hello = {
    type:GraphQLString,
    description:'Returns string',
    resolve:() => 'Hello World'
}

module.exports = {hello}