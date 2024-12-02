import React, { useState } from 'react';
import { Trash2, CheckCircle, Circle, Pencil, X, Check } from 'lucide-react';
import { Task, EditingTask } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, text: string, priority: 'low' | 'medium' | 'high') => void;
}

export default function TaskList({ tasks, onToggleTask, onDeleteTask, onUpdateTask }: TaskListProps) {
  const [editingTask, setEditingTask] = useState<EditingTask | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask({
      id: task.id,
      text: task.text,
      priority: task.priority,
    });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleSaveEdit = () => {
    if (editingTask && editingTask.text.trim()) {
      onUpdateTask(editingTask.id, editingTask.text, editingTask.priority);
      setEditingTask(null);
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 transition-all ${
            task.completed ? 'opacity-75' : ''
          }`}
        >
          {editingTask?.id === task.id ? (
            <div className="flex items-center gap-4 flex-1">
              <input
                type="text"
                value={editingTask.text}
                onChange={(e) => setEditingTask({ ...editingTask, text: e.target.value })}
                className="flex-1 px-3 py-1 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={editingTask.priority}
                onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
                className="px-2 py-1 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button
                onClick={handleSaveEdit}
                className="p-1 text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300"
              >
                <Check size={20} />
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-1 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onToggleTask(task.id)}
                  className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  {task.completed ? (
                    <CheckCircle className="text-green-500 dark:text-green-400" />
                  ) : (
                    <Circle />
                  )}
                </button>
                <span
                  className={`text-lg ${
                    task.completed
                      ? 'line-through text-gray-400 dark:text-gray-500'
                      : 'text-gray-800 dark:text-white'
                  }`}
                >
                  {task.text}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="p-1 text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="p-1 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}