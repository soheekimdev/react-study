import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, toggleTodo, selectAllTodos } from '../store/todosSlice';
import { useState } from 'react';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const todos = useSelector(selectAllTodos);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo.trim()));
      setNewTodo('');
    }
  };

  return (
    <div className="p-4">
      {/* 할 일 입력 폼 */}
      <form onSubmit={handleSubmit} className="w-full flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="새로운 할 일을 입력하세요"
          className="flex-1 p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          추가
        </button>
      </form>

      {/* 할 일 목록 */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between p-2 border rounded">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
                className="mr-2"
              />
              <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
            </div>
            <button onClick={() => dispatch(removeTodo(todo.id))} className="text-red-500">
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
