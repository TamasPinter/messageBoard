const express = require("express");
const auth = require("../middleware/auth");
const Comment = require("../models/Comment");
const Message = require("../models/Message");

const router = express.Router();

router.get("/message/:messageId", async (req, res) => {
  const messageId = req.params.messageId;

  try {
    const comments = await Comment.find({ message: messageId }).populate(
      "user",
      "username"
    );
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:commentId", auth, async (req, res) => {
  const commentId = req.params.commentId;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Permission denied" });
    }

    await comment.remove();
    res.json({ message: "Comment deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", auth, async (req, res) => {
  const { content, messageId } = req.body;
  const userId = req.user._id;

  try {
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    const comment = new Comment({ content, user: userId, message: messageId });
    await comment.save();

    message.comments.push(comment._id);
    await message.save();

    res.json({ message: "Comment posted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
