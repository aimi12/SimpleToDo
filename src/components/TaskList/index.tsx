import React from 'react';
import styles from './index.module.css';
import { TaskFilter } from '../TaskFilter';
import { useTasksContext } from '../../context/tasksContext';
import { TaskItem } from '../TaskItem';

export const TaskList: React.FC = React.memo(() => {
  const { tasks,toggleTask, removeTask} =
    useTasksContext();


  return (
    <div className={styles.taskSection}>
      <div className={styles.taskHeader}>
        <div className={styles.taskHeaderActions}>
          <TaskFilter />
        </div>
      </div>
      {tasks.length > 0 && (
        <ul className={styles.taskList}>
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              removeTask={removeTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
});

TaskList.displayName = 'TaskList';
