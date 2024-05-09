const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    tasks: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
