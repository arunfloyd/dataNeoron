const express = require("express");

// Here the routes have been set for each API calls
const router = express.Router();
const {
  addTask,
  getAllTask,
  updateTask,
  deleteTask,
  getCountAPI,
} = require("../controller/todoController");

router.post("/addTask", addTask);
router.get("/getAllTasks", getAllTask);
router.put("/updateTask/:id", updateTask);
router.delete("/deleteTask/:id", deleteTask);
router.get("/getCount", getCountAPI);

module.exports = router;
