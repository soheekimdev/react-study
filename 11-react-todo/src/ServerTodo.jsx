import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export default function ServerTodo() {
  const [todo, setTodo] = useState([]);
  const inputRef = useRef(null);

  const fetchData = useCallback(() => {
    axios.get('http://localhost:4000').then((res) => {
      setTodo(res.data);
      console.log(res.data);
    });
  }, []);

  const addTodo = useCallback(() => {
    axios.post('http://localhost:4000', inputRef.current.value).then(() => fetchData());
  }, []);

  const updateTodo = useCallback((id, newContent) => {
    axios.put('http://localhost:4000', { id, newContent }).then(() => fetchData());
  }, []);

  const deleteTodo = useCallback((id) => {
    axios.delete('http://localhost:4000', { data: { id } }).then(() => fetchData());
  }, []);

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
          // 문제:
          // 참조자료형(Array)인 Todo 데이터는 서버에 JSON.stringify를 거쳐 문자열 형태로 저장되었다가 다시 parse해서 되돌아 오기 때문에 주소값이 계속 바뀐다.
          // 그래서 List 컴포넌트에 memo를 사용하더라도 el의 주소값이 계속 바뀌어 컴포넌트의 리렌더링이 발생한다.
          // 해결 방법:
          // ClientTodo와 다르게 el을 통째로 내려주지 않고 스프레드 연산자를 사용해 펼쳐서 내려준다.
          // {...el}은 el의 내용({id: 'id', content: 'content'})을 펼쳐서 id={'id'} content={'content'}로 전달한다.
          // 이렇게 하면 원시값이 바뀌었는지를 비교하기 때문에 참조자료형의 주소값이 변해 리렌더링되는 현상을 막을 수 있다.
          // <List key={el.id} el={el} updateTodo={updateTodo} deleteTodo={deleteTodo} />
          <List key={el.id} {...el} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        ))}
      </ul>
    </>
  );
}

// ClientTodo와 다르게 el을 펼쳐서 내려줬기 때문에 el의 각 요소를 따로 따로 props로 받아야 함
// React.memo를 사용하면 컴포넌트에 전달하는 props 값의 변화 유무에 따라 컴포넌트의 리렌더링이 결정됨 (props 값이 변하면 리렌더링 발생)
// const List = React.memo(({ el, updateTodo, deleteTodo }) => {
const List = React.memo(({ id, content, updateTodo, deleteTodo }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <li>
      {/* {el.content} */}
      {content}
      <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button
        onClick={() => {
          // updateTodo(el.id, inputValue);
          updateTodo(id, inputValue);
        }}
      >
        수정
      </button>
      <button
        onClick={() => {
          // deleteTodo(el.id);
          deleteTodo(id);
        }}
      >
        X
      </button>
    </li>
  );
});
