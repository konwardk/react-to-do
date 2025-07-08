import React from 'react';
import { useState } from 'react';
import './assets/css/todo.css';
export default function Todo() {

  const [inputData, setInputData] = useState('');
  const [task,setTask ] = useState([]);
  
  const handleInputChange =(value)=>{
    setInputData(value);
  }

  const handleFormSubmit = (e) =>{
    e.preventDefault();

    if(!inputData) return alert("please add task");

    if(task.includes(inputData)){
        setInputData("");
        alert('Task Already added');
        return;
      }

    setTask((prevTask) => [...prevTask, inputData]);

    setInputData("");
  };

  
  const removeTask = (index) => {
    // Remove the task at the specified index
    setTask((prevTask) => prevTask.filter((_, i) => i !== index));
  };
  
  return (
    <>
      <div className='todo-container'>
        <h2>welcome to the TO DO app</h2>
        <form className='todo-form'>
          <input type='text' className='input-todo' 
            value={inputData}
            onChange={(e)=>{handleInputChange(e.target.value)}}>

          </input>
          <button className='form-btn' type='submit' onClick={handleFormSubmit}>Add</button>
        </form>
      </div>
      <div className='tasks'>
        <div className="task-item">
            {
              task.map((curTask,index)=>{
                return <div className="item" key={index}>
                <li>
                   {curTask}
                </li>
                  <div className="cross" onClick={() => removeTask(index)}>X</div>
                </div>
                
              })
              
            }
        </div>
      </div>
    </>
  )
}
