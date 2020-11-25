const { Schema, model } = require("mongoose");

// create new schema for comment model
const CommentSchema = new Schema({
  writtenBy: {
    type: String,
  },
  commentBody: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
