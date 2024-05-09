import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ResizePanel from "react-resize-panel";
import { addTask } from "../utils/taskSlice";
import { addCount } from "../utils/apiCountSlice";

const ResizableComponent = () => {
  const [taskInput, setTaskInput] = useState("");
  const [updateCount, setUpdateCount] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((store) => store?.task);

  const count = useSelector((store) => store?.apiCount);

  console.log(user?.task);
  const handleChange = (e) => {
    setTaskInput(e.target.value);
  };

  useEffect(() => {
    const gettingData = async () => {
      try {
        const response = await axios.get(
          "http://13.201.0.124/api/getAllTasks"
        );
        const count = await axios.get("http://localhost:8080/api/getCount");
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
  const handleSubmit = async () => {
    try {
      const newTask = { text: taskInput, completed: false };
      console.log(taskInput);
      await axios.post("http://13.201.0.124/api/addTask", {
        tasks: taskInput,
      });
      setTaskInput("");
      setUpdateCount(updateCount + 1);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  // const handleEdit = (index) => {
  //   const updatedTasks = [...tasks];
  //   updatedTasks[index].text = prompt("Edit Task:", updatedTasks[index].text);
  //   setTasks(updatedTasks);
  //   setUpdateCount(updateCount + 1);
  // };

  const handleDelete = async (taskId) => {
    try {
      // Call backend API to update task data
      await axios.delete(`http://localhost:8080/api/deleteTask/${taskId}`);

      // Dispatch action to update task data in Redux store
      // dispatch(updateTaskInStore(editedTask));
      setUpdateCount(updateCount + 1);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleEdit = (taskId) => {
    const taskToEdit = user.task.find((task) => task._id === taskId);
    setEditedTask(taskToEdit);
    setIsModalOpen(true);
  };

  const handleSubmitEdit = async () => {
    try {
      // Call backend API to update task data
      await axios.put(
        `http://localhost:8080/api/updateTask/${editedTask._id}`,
        editedTask
      );
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
          <ResizePanel
            direction="e"
            style={{ width: "50%", minWidth: "50px", border: "10px solid red" }}
          >
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
          </ResizePanel>
          <ResizePanel
            direction="w"
            style={{ width: "50%", minWidth: "50px", border: "10px solid red" }}
          >
            <div
              key="div1"
              className="w-full flex flex-col flex-wrap flex-grow justify-center overflow-hidden"
            >
              <h1 className="text-3xl font-bold mb-4 text-center text-ellipsis text-nowrap underline">
                API Count{" "}
              </h1>
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
          </ResizePanel>
        </div>
        <ResizePanel
          direction="n"
          style={{ height: "50%", minHeight: "50px", border: "10px solid red" }}
        >
          <div
            key="div3"
            className="w-full flex flex-col flex-grow justify-center"
          >
            {/* <h1 className="text-3xl font-bold mb-4 text-center text-ellipsis text-nowrap"> */}
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

            {/* Modal */}
            {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-5 rounded-lg shadow-md max-w-md overflow-auto">
      <input
        type="text"
        value={editedTask.tasks}
        onChange={(e) =>
          setEditedTask({...editedTask, tasks: e.target.value })
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
        </ResizePanel>
      </div>
    </div>
  );
};

export default ResizableComponent;
