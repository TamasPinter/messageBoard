const express = require("express");
const auth = require("../middleware/auth");
const Message = require("../models/Message");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().populate("user", "username");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/user", auth, async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user._id }).populate(
      "user",
      "username"
    );
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:messageId", auth, async (req, res) => {
  const messageId = req.params.messageId;

  try {
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    if (message.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Please log in" });
    }

    await message.remove();

    res.json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", auth, async (req, res) => {
  const { content } = req.body;
  const userId = req.user._id;

  try {
    const message = new Message({ content, user: userId });
    await message.save();
    res.json({ message: "Message posted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
