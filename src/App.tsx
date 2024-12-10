import './App.css'
import React from 'react';
import { Title } from './components/Title';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';

const TodoApp: React.FC = () => {
  return (
    <>
      <Title title="Simple To Do List" level="h2" />
      <TaskForm />
      <TaskList />
    </>
  );
};

export default TodoApp;
