const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already take" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "user created!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid login" });
    }

    const token = jwt.sign({ userId: user._id }, "secret-key", {
      expiresIn: "1 hour",
    });

    user.token = token;
    await user.save();

    res.json({ token, user: { username: user.username, avatar: user.avatar } });
  } catch (err0r) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();
    res.json({ message: "user logged out" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/profile", auth, async (req, res) => {
  try {
    res.json({
      user: { username: req.user.username, avatar: req.user.avatar },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
