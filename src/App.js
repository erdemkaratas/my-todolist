import { useState } from 'react';
import './App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ToDoCard from './components/ToDoCard/ToDoCard';
function App() {
  const [tasks,setTasks]=useState([]);
  const [selectedDate,setSelectedDate]=useState(new Date());
  const tomorrow = new Date(selectedDate);
  tomorrow.setDate(selectedDate.getDate() - 1);

  function addTask(task) {
    setTasks([...tasks, task]);
  }

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  const filteredTasks = tasks.filter(
  (task) => {
    const taskDate = new Date(task.date).toDateString();
    const selectedDateStr = selectedDate.toDateString();
    const tomorrowStr = tomorrow.toDateString();
    return (
      taskDate === selectedDateStr ||
      (!task.completed)
    );
  }
);

  // function handleTaskCompletion(index) {
    
  //   const updatedTasks = [...tasks];

  //   updatedTasks[index].completed = !updatedTasks[index].completed;

  //   setTasks(updatedTasks);

  // }
  function handleTaskCompletion(index) {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  }
  


  return (
    <div className='body'>
      <h2 className="ToDoHeader">To Do List</h2>
      <div class="container">
        <div class="left-column">
        <Calendar className="calendar"  value={selectedDate} onChange={handleDateChange} />
      </div>
      <div class="middle-column">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const taskDescription = e.target.elements.taskDescription.value;
          if (taskDescription) {
            addTask({ description: taskDescription, date: selectedDate, completed: false });
            e.target.reset();
          }
        }}
      >
        <label>
          <input className="textinput" type="text" name="taskDescription" placeholder='Add Todo' required />
        </label>
        <div style={{ display: "flex", justifyContent: "center" }}>
        <button className='button-submit' type="submit">Add</button>
        </div>
      </form>
      </div>
      <div class="right-column">
      <ul>
      <ToDoCard tasks={tasks} handleTaskCompletion={handleTaskCompletion} />
      </ul>
  </div>
</div>
       
    </div>
    
  );
}

export default App;
