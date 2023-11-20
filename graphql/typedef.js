const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");
const {User} = require('../models');

const userType = new GraphQLObjectType({
    name:"UserType",
    description:"The user type",
    fields: {
        id:{ type:GraphQLID },
        username: {type: GraphQLString},
        email:{type: GraphQLString},
        displayName:{type: GraphQLString},
        createdAt:{type:GraphQLString},
        updatedAt:{type:GraphQLString}
    }
});

const postType = new GraphQLObjectType({
    name:"PostType",
    description:"Create Post",
    fields:{
        id:{type: GraphQLID},
        title:{type: GraphQLString},
        body:{type: GraphQLString},
        author:{type:userType, resolve(parent, args){
           return  User.findById(parent.authorId)
        }},
        createdAt: {type:GraphQLString},
        updatedAt: {type:GraphQLString}
        //authorId:{type:GraphQLID}
    }
});


module.exports = {
    userType,
    postType
}