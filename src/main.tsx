
import './index.css'
import App from './App.tsx'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { TasksProvider } from './context/tasksContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TasksProvider>
    <App />
  </TasksProvider>
);
