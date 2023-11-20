const { Schema, model, trusted } = require("mongoose");

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
}, {
    timestamps:true
});

module.exports = model('Post', postSchema );
