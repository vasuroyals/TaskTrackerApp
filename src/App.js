import React, { useState, useEffect } from 'react';
import AddTaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import EditTaskModal from './components/EditTaskModel';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]); 
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); 

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
    setFilteredTasks(savedTasks); // Initialize filtered tasks
  }, []);

  const handleAddTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    updateTasks(updatedTasks);
  };

  const handleEditTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    updateTasks(updatedTasks);
    setEditingTask(null);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      updateTasks(updatedTasks);
    }
  };

  const updateTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks); // Update filtered tasks as well
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleFilter = (status) => {
    if (status === '') {
      setFilteredTasks(tasks); // Show all tasks if no filter is selected
    } else {
      const filtered = tasks.filter((task) => task.status === status);
      setFilteredTasks(filtered);
    }
  };

  return (
    <div className="app-container">
      <h1 className="heading">Task Tracker</h1>

      {/* Add Task Form */}
      <AddTaskForm onAddTask={handleAddTask} />

      {/* Filter Bar */}
      <FilterBar onFilter={handleFilter} />

      {/* Task List */}
      {filteredTasks.length > 0 ? (
        <TaskList
          tasks={filteredTasks}
          onEdit={(task) => setEditingTask(task)}
          onDelete={handleDeleteTask}
        />
      ) : (
        <p className="no-tasks-message">No tasks match the selected filter!</p>
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onSave={handleEditTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}

export default App;
