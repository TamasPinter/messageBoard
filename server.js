const express = require("express");
const connectDB = require("./db");
const User = require("./models/User");
const Message = require("./models/Message");
const Comment = require("./models/Comment");

const app = express();

connectDB();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
