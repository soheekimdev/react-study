import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function ServerTodo() {
  const [todo, setTodo] = useState([]);
  const inputRef = useRef(null);

  const fetchData = () => {
    axios.get("http://localhost:4000").then((res) => setTodo(res.data));
  };

  const addTodo = () => {
    axios
      .post("http://localhost:4000", inputRef.current.value)
      .then(() => fetchData());
  };

  const updateTodo = (id, newContent) => {
    axios
      .put("http://localhost:4000", { id, newContent })
      .then(() => fetchData());
  };

  const deleteTodo = (id) => {
    axios
      .delete("http://localhost:4000", { data: { id } })
      .then(() => fetchData());
  };

  useEffect(() => {
    fetchData();
  }, []);

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
