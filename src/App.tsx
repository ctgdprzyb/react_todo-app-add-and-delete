/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoError, TodoFooter, TodoList } from './components';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { UserIdContext } from './utils/userIdContext';

const USER_ID = 10624;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [filteringMode, setFilteringMode] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then(response => setTodos(response))
      .catch(() => setError('cantfetch'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <UserIdContext.Provider value={USER_ID}>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <TodoList todos={todos} filteringMode={filteringMode} />
          {/* handle rendering the todo list and the todo entry field */}

          {/* Hide the footer if there are no todos */}
          {todos && (
            <TodoFooter
              setFilteringMode={setFilteringMode}
              filteringMode={filteringMode}
            />
          )}
        </div>

        {/* Notification is shown in case of any error */}
        {/* Add the 'hidden' class to hide the message smoothly */}
        {error && <TodoError error={error} setError={setError} />}
      </div>
    </UserIdContext.Provider>
  );
};
