const TodoModel = require("../models/todoModel");
const CountModel = require("../models/countModel");
const asyncHandler = require("express-async-handler");

const addTask = asyncHandler(async (req, res) => {
  const { tasks } = req.body;
  console.log(tasks);

  try {
    // Save the task to MongoDB using your TodoModel
    const savedTask = await TodoModel.create({ tasks: tasks });
    if (savedTask) {
      const data = await CountModel.updateOne(
        { _id: "663c72feb1fe70fcb1bddf53" },
        { $inc: { taskCount: 1, totalCount: 1 } }
      );
      console.log(data);
    }
    res
      .status(201)
      .json({ message: "Task added successfully", task: savedTask });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Error adding task" });
  }
});

const getAllTask = asyncHandler(async (req, res) => {
  try {
    const savedTask = await TodoModel.find();
    res.status(201).json({ message: "Task got successfully", task: savedTask });
  } catch (error) {
    console.error("Error getting task:", error);
    res.status(500).json({ message: "Error getting task" });
  }
});

const updateTask = asyncHandler(async (req, res) => {
  try {
    const { tasks } = req.body;
    const Id = req.params.id;
    const updatedTask = await TodoModel.findByIdAndUpdate(Id, { tasks: tasks });
    if (updatedTask) {
      const data = await CountModel.updateOne(
        { _id: "663c72feb1fe70fcb1bddf53" },
        { $inc: { updateCount: 1, totalCount: 1 } }
      );
    }
    res.status(201).json({ message: "Task got successfully" });
  } catch (error) {
    console.error("Error getting task:", error);
    res.status(500).json({ message: "Error getting task" });
  }
});
const deleteTask = asyncHandler(async (req, res) => {
  try {
    const Id = req.params.id;
    const deletedTask = await TodoModel.findByIdAndDelete(Id);
    if (deletedTask) {
      const data = await CountModel.updateOne(
        { _id: "663c72feb1fe70fcb1bddf53" },
        { $inc: { deleteCount: 1, totalCount: 1 } }
      );
    }

    res.status(201).json({ message: "Task got successfully" });
  } catch (error) {
    console.error("Error getting task:", error);
    res.status(500).json({ message: "Error getting task" });
  }
});

const getCountAPI = asyncHandler(async (req, res) => {
  try {
    const data = await CountModel.find();

    res.status(201).json({ message: "Task got successfully", count: data });
  } catch (error) {
    console.error("Error getting task:", error);
    res.status(500).json({ message: "Error getting task" });
  }
});

module.exports = { addTask, getAllTask, updateTask, deleteTask, getCountAPI };
