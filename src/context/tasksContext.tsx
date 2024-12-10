import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { Task } from '../types';

interface TasksContextType {
  tasks: Task[];
  addTask: (taskName: string) => void;
  removeTask: (id: number) => void;
  toggleTask: (id: number) => void;
  clearAllTasks: () => void;
  filterTasks: 'all' | 'completed' | 'incomplete';
  setFilterTasks: (filter: 'all' | 'completed' | 'incomplete') => void;
  hasPendingTasks: boolean;
  isTaskListEmpty: boolean;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterTasks, setFilterTasks] = useState<
    'all' | 'completed' | 'incomplete'
  >('all');

  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      setTasks(storedTasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((taskName: string) => {
    if (taskName.trim()) {
      const newTask = {
        id: Date.now(),
        name: taskName,
        completed: false,
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
    }
  }, []);

  const removeTask = useCallback((id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  const toggleTask = useCallback((id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  }, []);

  const clearAllTasks = useCallback(() => {
    setTasks([]);
  }, []);

  const filteredTasks = useMemo(() => {
    switch (filterTasks) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'incomplete':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filterTasks]);

  const isTaskListEmpty = useMemo(() => tasks.length === 0, [tasks]);
  const hasPendingTasks = useMemo(
    () => tasks.some(task => !task.completed),
    [tasks]
  );

  return (
    <TasksContext.Provider
      value={{
        tasks: filteredTasks,
        addTask,
        removeTask,
        toggleTask,
        clearAllTasks,
        filterTasks,
        setFilterTasks,
        hasPendingTasks,
        isTaskListEmpty,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasksContext must be used within a TasksProvider');
  }
  return context;
};