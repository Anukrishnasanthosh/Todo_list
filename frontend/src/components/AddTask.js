import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTask() {
  const [newTask, setNewTask] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const navigate = useNavigate();

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask || !newStatus || !newDeadline) {
      alert("All fields must be filled out.");
      return;
    }

    axios.post('http://127.0.0.1:5000/addTodoList', {
      task: newTask,
      status: newStatus,
      deadline: newDeadline
    })
      .then(res => {
        console.log(res);
        navigate("/");  // Redirect to the TodoList page
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Task</h2>
      <form className="bg-light p-4" onSubmit={addTask}>
        <div className="mb-3">
          <label>Task</label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Status</label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Deadline</label>
          <input
            className="form-control"
            type="datetime-local"
            value={newDeadline}
            onChange={(e) => setNewDeadline(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success btn-sm">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
