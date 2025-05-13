import { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDone, MdDoneAll } from "react-icons/md";
import './assets/css/todo.css';
import { Footer } from './components/Footer';

export default function Todo() {

  const [inputData, setInputData] = useState('');

  const [task, setTask] = useState(() => {
    const storedTasks = localStorage.getItem('todo-tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('todo-tasks');
    if (storedTasks) {
      setTask(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever task state changes
  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(task));
  }, [task]);

  const handleInputChange = (value) => {
    setInputData(value);
  };

  // handle form submit

  const handleFormSubmit = (e) => {
  e.preventDefault();

  const trimmedInput = inputData.trim();
  if (!trimmedInput) return alert('Please add a task');

  if (isEditing) {
    const updatedTasks = [...task];
    updatedTasks[editIndex].text = trimmedInput;
    updatedTasks[editIndex].addedAt = new Date().toLocaleString(); // Optional: update timestamp
    setTask(updatedTasks);
    setIsEditing(false);
    setEditIndex(null);
    setInputData('');
    return;
  }

  const isDuplicate = task.some(t => t.text === trimmedInput);
  if (isDuplicate) {
    setInputData('');
    alert('Task already added');
    return;
  }

  const newTask = {
    text: trimmedInput,
    addedAt: new Date().toLocaleString(),
    isDone: false,
  };

  setTask((prevTask) => [...prevTask, newTask]);
  setInputData('');
};


  const editTask = (index) => {
  setInputData(task[index].text);
  setEditIndex(index);
  setIsEditing(true);
};


  const removeTask = (index) => {
    setTask((prevTask) => prevTask.filter((_, i) => i !== index));
  };

  const toggleDone = (index) => {
  setTask(prevTask =>
    prevTask.map((task, i) =>
      i === index
        ? { ...task, isDone: !task.isDone, bgColor: task.isDone ? '' : 'green' }
        : task
    )
  );
};
  return (
    <>
      <div className="todo-container">
        <div className="date-time">
          <p>Current Date and Time: {currentDateTime}</p>
        </div>
        <div className="heading">
          <div className="header">
            <h2>My ToDo</h2>
          <h5>Manage Your Daily Tasks</h5>
          </div>
        </div>
        <form className="todo-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="input-todo"
            aria-label="Add a task"
            value={inputData}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <button className="form-btn" type="submit">Add</button>
        </form>
      </div>

      <div className="tasks">
        <ul className="task-item">
          {task.map((curTask, index) => (
            <li className="item" key={index} style={{ backgroundColor: curTask.bgColor  || '' ,fontWeight: curTask.isDone ? 'bold' : 'normal' }}>
              <div>
                <strong>{curTask.text}</strong>
                <div className="timestamp">Added: {curTask.addedAt}</div>
              </div>
              <div className="action-icons">

                  <span className='edit-btn' onClick={() => editTask(index)} prole="button" aria-label="Edit task">
                  <FaEdit />
                </span>

                {curTask.isDone ? (
                  <span className="doneall-btn" onClick={() => toggleDone(index)}>
                    <MdDoneAll />
                  </span>
                ) : (
                  <span className="done-btn" onClick={() => toggleDone(index)}>
                    <MdDone />
                  </span>
                )}
                <span
                  className="close-btn"
                  onClick={() => removeTask(index)}
                  role="button"
                  aria-label="Remove task"
                >
                  <IoClose />
                </span>
              </div>
            </li>
          ))}
        </ul>
        
      </div>
      
      <Footer/>
      
    </>
  );
}
