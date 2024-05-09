import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../utils/taskSlice";
import { addCount } from "../utils/apiCountSlice";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import MiddlePanel from "./MiddlePanel";
import { BASE_URL } from "../utils/constant";

const ResizableComponent = () => {
  const [taskInput, setTaskInput] = useState("");
  const [updateCount, setUpdateCount] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((store) => store?.task);

  const count = useSelector((store) => store?.apiCount);

  const handleChange = (e) => {
    setTaskInput(e.target.value);
  };

  // To Access the Saved API Count and the ToDo Datas
  useEffect(() => {
    const gettingData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getAllTasks`);
        const count = await axios.get(`${BASE_URL}/getCount`);
        const countData = count.data.count;
        const data = response.data;
        console.log(countData);
        dispatch(addTask(data));
        dispatch(addCount(countData));
      } catch (error) {
        console.error("Error getting task:", error);
      }
    };
    gettingData();
  }, [updateCount]);

  // Here the User can add the Task

  const handleSubmit = async () => {
    try {
      const newTask = { text: taskInput, completed: false };
      console.log(taskInput);
      await axios.post(`${BASE_URL}/addTask`, {
        tasks: taskInput,
      });
      setTaskInput("");
      setUpdateCount(updateCount + 1);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  //Here the task can be deleted by the user

  const handleDelete = async (taskId) => {
    // Ask for confirmation
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`${BASE_URL}/deleteTask/${taskId}`);
        setUpdateCount(updateCount + 1);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  // Here the Task can be Edited

  const handleEdit = (taskId) => {
    const taskToEdit = user.task.find((task) => task._id === taskId);
    setEditedTask(taskToEdit);
    setIsModalOpen(true);
  };

  const handleSubmitEdit = async () => {
    try {
      await axios.put(`${BASE_URL}/updateTask/${editedTask._id}`, editedTask);
      setUpdateCount(updateCount + 1);
      setIsModalOpen(false);
      setEditedTask(null);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8 w-full min-h-screen flex justify-center items-center">
      <div className="w-full h-full flex flex-col justify-center">
        <div className="flex flex-grow justify-center w-full overflow-hidden">
          <LeftPanel>
            <div
              key="div0"
              className="w-full flex flex-col flex-grow justify-center overflow-hidden"
            >
              <input
                className="border-black rounded-full bg-slate-600 p-5 mb-4 "
                type="text"
                value={taskInput}
                onChange={handleChange}
                placeholder="Enter task here..."
                style={{ width: "50%", alignSelf: "center" }}
              />
              <button
                className="border-black rounded-full px-4 py-2 my-10 bg-blue-500 text-white text-lg"
                onClick={handleSubmit}
                style={{ width: "20%", alignSelf: "center" }}
              >
                Add Task
              </button>
            </div>
          </LeftPanel>
          <RightPanel>
            <div
              key="div1"
              className="w-full flex flex-col flex-wrap flex-grow justify-center overflow-hidden"
            >
              <h1 className="text-3xl font-bold mb-4 text-center text-ellipsis text-nowrap underline">
                API Count{" "}
              </h1>

              {/* If there is count which is got from the API will show here */}

              {count &&
                count?.map((element) => (
                  <h1
                    key={element.id}
                    className="text-2xl font-bold mb-4 text-center text-ellipsis "
                  >
                    Task Count : {element.taskCount}
                    <h1> Update Count : {element.updateCount}</h1>
                    <h1>Delete Count : {element.deleteCount}</h1>
                    <h1> Total Count : {element.totalCount}</h1>
                  </h1>
                ))}
            </div>
          </RightPanel>
        </div>
        <MiddlePanel>
          <div
            key="div3"
            className="w-full flex flex-col flex-grow justify-center"
          >
            {/* Here the task will be shown and also the User can edit and delte the task */}

            <table className="border-collapse ">
              <thead>
                <tr>
                  <th className="border border-black font-bold text-xl py-2 text-center">
                    Index
                  </th>
                  <th className="border border-black font-bold text-xl py-2 text-center">
                    Task
                  </th>
                  <th className="border border-black font-bold text-xl py-2 text-center">
                    Edit
                  </th>
                  <th className="border border-black font-bold text-xl py-2 text-center">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {user?.task &&
                  user?.task.map((task, index) => (
                    <tr key={index}>
                      <td className="border border-black font-medium font-lg py-2 text-center">
                        {index + 1}
                      </td>
                      <td className="border border-black py-2 text-center">
                        <span className={task.completed ? "line-through" : ""}>
                          {task.tasks}
                        </span>
                      </td>
                      <td className="border border-black py-2 font-medium font-lg text-center">
                        <button
                          onClick={() => handleEdit(task._id)}
                          className="text-clip"
                        >
                          ✂️
                        </button>
                      </td>
                      <td className="border border-black py-2 font-medium text-center">
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="text-clip"
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* This the Modal area where the user can edit the task */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-5 rounded-lg shadow-md max-w-md overflow-auto">
                  <input
                    type="text"
                    value={editedTask.tasks}
                    onChange={(e) =>
                      setEditedTask({ ...editedTask, tasks: e.target.value })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <button
                    onClick={handleSubmitEdit}
                    className="mt-4 px-4 py-2 border-none rounded cursor-pointer hover:bg-blue-500 hover:text-white"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-4 px-4 py-2 border-none rounded cursor-pointer hover:bg-blue-500 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </MiddlePanel>
      </div>
    </div>
  );
};

export default ResizableComponent;
