import { useRef, useState } from "react";

export default function ClientTodo() {
  const [todo, setTodo] = useState([
    { id: 1, content: "밥먹기" },
    { id: 2, content: "공부하기" },
  ]);

  const inputRef = useRef(null);

  const addTodo = () => {
    setTodo((prev) => [
      ...prev,
      { id: Number(new Date()), content: inputRef.current.value },
    ]);
  };

  const updateTodo = (id, newContent) => {
    setTodo((prev) =>
      prev.map((el) => (el.id === id ? { id, content: newContent } : el))
    );
  };

  const deleteTodo = (id) => {
    setTodo((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <>
      <h1>To Do List</h1>
      <div id="todo-input">
        <input type="text" placeholder="할 일을 입력하세요" ref={inputRef} />
        <button onClick={addTodo}>추가하기</button>
      </div>
      <ul id="todo-list">
        {todo.map((el) => (
          <List
            key={el.id}
            el={el}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </>
  );
}

const List = ({ el, updateTodo, deleteTodo }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <li>
      {el.content}
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={() => {
          updateTodo(el.id, inputValue);
        }}
      >
        수정
      </button>
      <button
        onClick={() => {
          deleteTodo(el.id);
        }}
      >
        X
      </button>
    </li>
  );
};
