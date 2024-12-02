import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface TaskInputProps {
  onAddTask: (task: string, priority: 'low' | 'medium' | 'high') => void;
}

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      onAddTask(task, priority);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
        >
          <PlusCircle size={20} />
          Add
        </button>
      </div>
    </form>
  );
}