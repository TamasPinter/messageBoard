const express = require("express");
const connectDB = require("./db");
const User = require("./models/User");
const Message = require("./models/Message");
const Comment = require("./models/Comment");
const cors = require("cors");

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000", // add [] for multiple origins, heroku url
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/comments", require("./routes/comments"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
