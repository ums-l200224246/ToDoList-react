import React, { useState, useEffect } from 'react';
import { CheckSquare } from 'lucide-react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import ThemeToggle from './components/ThemeToggle';
import { Task } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string, priority: 'low' | 'medium' | 'high') => {
    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        priority,
      },
    ]);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, text: string, priority: 'low' | 'medium' | 'high') => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text, priority } : task
      )
    );
  };

  const activeTasks = tasks.filter((task) => !task.completed).length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 transition-colors duration-200">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <CheckSquare className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Task Master</h1>
            </div>
            <ThemeToggle />
          </div>

          <TaskInput onAddTask={addTask} />

          <div className="mt-8 flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>{activeTasks} tasks remaining</span>
            <span>{completedTasks} tasks completed</span>
          </div>

          <div className="mt-6">
            <TaskList
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onUpdateTask={updateTask}
            />
          </div>

          {tasks.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p>No tasks yet. Add some tasks to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;