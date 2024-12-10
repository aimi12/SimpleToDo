import React from 'react';
import styles from './index.module.css';
import { useTasksContext } from '../../context/tasksContext';

export const TaskFilter: React.FC = () => {
  const { setFilterTasks, isTaskListEmpty } = useTasksContext();

  if (isTaskListEmpty) {
    return null;
  } else {
    return (
      <div className={styles.selectContainer}>
        {isTaskListEmpty ? (
          <p>No tasks available</p>
        ) : (
          <>
            <select
              className={styles.selectSection}
              onChange={e =>
                setFilterTasks(
                  e.target.value as 'all' | 'completed' | 'incomplete'
                )
              }
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </>
        )}
      </div>
    );
  }
};
