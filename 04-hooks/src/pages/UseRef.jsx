import { useRef, useState } from 'react';

const UseRef = () => {
  return (
    <>
      <ControlledInput />
      <br />
      <UseRefInput />
      <br />
      <Counter />
    </>
  );
};

const ControlledInput = () => {
  const [inputValue, setInputValue] = useState('');
  console.log('ControlledInput');

  return <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} />;
};

const UseRefInput = () => {
  const inputRef = useRef(null);
  const getInputValue = () => {
    console.log(inputRef.current.value);
  };
  console.log('UseRefInput');
  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} />
      <br />
      <button onClick={getInputValue}>input 값 가져오기</button>
      <br />
      <button onClick={focusInput}>focus!!</button>
    </>
  );
};

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const numberRef = useRef(null);

  return (
    <>
      <div>counter: {counter}</div>
      <button
        onClick={() => {
          setCounter((prev) => prev + 1);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setCounter((prev) => prev - 1);
        }}
      >
        -
      </button>
      <br />
      <button onClick={() => (numberRef.current = counter)}>Keep Value</button>
      <button onClick={() => console.log(numberRef.current)}>Show Value</button>
    </>
  );
};

export default UseRef;
