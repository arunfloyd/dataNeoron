const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://arunfloyd:7yGlqYToYq4NHG19@cluster0.qsbejnh.mongodb.net/neutron",
    );

    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
  }
};


module.exports = dbConnect;