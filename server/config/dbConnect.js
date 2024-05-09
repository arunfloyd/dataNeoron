const mongoose = require("mongoose");


// Connection with MongoDB Atlas 
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
  }
};

module.exports = dbConnect;
