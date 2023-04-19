import React from 'react';
import './ToDoCardStyle.css'
function ToDoCard({ tasks, handleTaskCompletion }) {
  return (
    <>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task, index) => (
            <li className='tasklist' key={index}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTaskCompletion(index)}
              />
              <span  style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                {task.description}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks for selected date.</p>
      )}
    </>
  );
}

export default ToDoCard;
