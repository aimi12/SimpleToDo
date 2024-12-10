import { useEffect, useState, useMemo, useCallback } from 'react';
import { Task } from '../types';

export const useTasks = () => {
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
        subtask:[]
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

  const isTaskListEmpty = useMemo(() => {
    return tasks.length === 0;
  }, [tasks]);

  const hasPendingTasks = useMemo(
    () => tasks.some(task => !task.completed),
    [tasks]
  );

  const setFilter = useCallback(
    (filter: 'all' | 'completed' | 'incomplete') => {
      setFilterTasks(filter);
    },
    []
  );

  return {
    tasks: filteredTasks,
    addTask,
    removeTask,
    toggleTask,
    clearAllTasks,
    setFilterTasks: setFilter,
    hasPendingTasks,
    isTaskListEmpty,
  };
};
