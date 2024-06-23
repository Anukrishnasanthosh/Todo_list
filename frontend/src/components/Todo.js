import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './TodoList.css'; // Import custom CSS

function TodoList() {
  const [todoList, settodoList] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [editedDeadline, setEditedDeadline] = useState("");

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/getTodoList')
      .then(result => {
        settodoList(result.data);
      })
      .catch(err => console.log(err));
  }, []);

  const toggleEditable = (id) => {
    const rowData = todoList.find((data) => data._id === id);
    if (rowData) {
      setEditableId(id);
      setEditedTask(rowData.task);
      setEditedStatus(rowData.status);
      setEditedDeadline(rowData.deadline || "");
    } else {
      setEditableId(null);
      setEditedTask("");
      setEditedStatus("");
      setEditedDeadline("");
    }
  };

  const saveEditedTask = (id) => {
    const editedData = {
      task: editedTask,
      status: editedStatus,
      deadline: editedDeadline,
    };
    if (!editedTask || !editedStatus || !editedDeadline) {
      alert("All fields must be filled out.");
      return;
    }
    axios.post('http://127.0.0.1:5000/updateTodoList/' + id, editedData)
      .then(result => {
        console.log(result);
        setEditableId(null);
        setEditedTask("");
        setEditedStatus("");
        setEditedDeadline("");
        settodoList(todoList.map(task => task._id === id ? { ...task, ...editedData } : task));
      })
      .catch(err => console.log(err));
  };

  const deleteTask = (id) => {
    axios.delete('http://127.0.0.1:5000/deleteTodoList/' + id)
      .then(result => {
        console.log(result);
        settodoList(todoList.filter(task => task._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Todo List</h2>
      <Link to="/add-task" className="btn btn-success mb-3">Add Task</Link>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          {Array.isArray(todoList) ? (
            <tbody>
              {todoList.map((data) => (
                <tr key={data._id} className={editableId === data._id ? "table-warning" : ""}>
                  <td>
                    {editableId === data._id ? (
                      <input
                        type="text"
                        className="form-control"
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                      />
                    ) : (
                      data.task
                    )}
                  </td>
                  <td>
                    {editableId === data._id ? (
                      <input
                        type="text"
                        className="form-control"
                        value={editedStatus}
                        onChange={(e) => setEditedStatus(e.target.value)}
                      />
                    ) : (
                      data.status
                    )}
                  </td>
                  <td>
                    {editableId === data._id ? (
                      <input
                        type="datetime-local"
                        className="form-control"
                        value={editedDeadline}
                        onChange={(e) => setEditedDeadline(e.target.value)}
                      />
                    ) : (
                      data.deadline ? new Date(data.deadline).toLocaleString() : ''
                    )}
                  </td>
                  <td>
                    {editableId === data._id ? (
                      <button className="btn btn-success btn-sm mr-1" onClick={() => saveEditedTask(data._id)}>
                        Save
                      </button>
                    ) : (
                      <button className="btn btn-primary btn-sm mr-1" onClick={() => toggleEditable(data._id)}>
                        Edit
                      </button>
                    )}
                    <button className="btn btn-danger btn-sm" onClick={() => deleteTask(data._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="4" className="text-center">Loading tasks...</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default TodoList;
