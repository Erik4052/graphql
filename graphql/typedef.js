const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require("graphql");
const { User, Post, Comment } = require("../models");

const userType = new GraphQLObjectType({
  name: "UserType",
  description: "The user type",
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    displayName: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

const postType = new GraphQLObjectType({
  name: "PostType",
  description: "Create Post",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    author: {
      type: userType,
      resolve(parent, args) {
        return User.findById(parent.authorId);
      },
    },
    comments:{
        type: new GraphQLList(commentType),
       async resolve(parent){
            return await Comment.find({postId:parent.id})
        }
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    //authorId:{type:GraphQLID}
  }),
});

const commentType = new GraphQLObjectType({
  name: "CommentType",
  description: "Comment Type",
  fields: {
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: userType,
      resolve(parent) {
        return User.findById(parent.userId);
      },
    },
    post: {
      type: postType,
      resolve(parent) {
        return Post.findById(parent.postId);
      },
    },
  },
});

module.exports = {
  userType,
  postType,
  commentType,
};
