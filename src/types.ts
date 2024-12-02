export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface EditingTask {
  id: string;
  text: string;
  priority: 'low' | 'medium' | 'high';
}