const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: Schema.Types.ObjectId, ref: "Message", required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
