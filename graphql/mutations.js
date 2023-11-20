const { GraphQLString, GraphQLID } = require("graphql");
const { User, Post } = require("../models");
const { createJWT } = require("../util/auth");
const { postType } = require("./typedef");

const register = {
  type: GraphQLString,
  description: "Register a new user and returns token",
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    displayName: { type: GraphQLString },
  },
  async resolve(_, args) {
    const { username, email, password, displayName } = args;
    const newUser = new User({ username, email, password, displayName });
    await newUser.save();
    const token = createJWT({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });
    return token;
  },
};

const login = {
  type: GraphQLString,
  description: "Login an user and returns token",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_, args) {
    const user = await User.findOne({ email: args.email }).select("+password");
    if (!user || args.password !== user.password) {
      throw new Error("Invalid Credentials");
    }
    const token = createJWT({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
    console.log(token);
    return token;
  },
};

const createPost = {
  type: postType,
  description: "Create new post",
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(_, args, { verified }) {
    console.log(verified);
    const newPost = new Post({
      title: args.title,
      body: args.body,
      authorId: verified._id,
    });

    await newPost.save();

    return newPost;
  },
};

const updatePost = {
    type:postType,
    description:'Update Post',
    args:{ 
        id:{ type:GraphQLID},
        title:{ type:GraphQLString},
        body: {type: GraphQLString}
    },
    async resolve(parent, {id, title, body}, {verified}) {
        console.log(verified);
        if(!verified){
            throw new Error('Unauthorized')
        }
    const updatedPost = await Post.findOneAndUpdate(
            {
                _id:id,
                authorId: verified._id //Comparison between id's
            },
            { 
                title,
                body
            },
            {
                new:true,
                runValidators:true
            }
            );

        return updatedPost;
    }
}



module.exports = { register, login, createPost, updatePost };
