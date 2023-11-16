const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://brolli673:Genocide13!@messageboard.ckspwiz.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connectng to MongoDB: ", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
