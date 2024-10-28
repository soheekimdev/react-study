import { useState } from 'react';

function Hello() {
  const [value, setValue] = useState('');

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="여기에 입력해주세요."
      />

      <button
        onClick={() => {
          alert('button clicked!');
        }}
      >
        클릭
      </button>
    </div>
  );
}

export default Hello;
