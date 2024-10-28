const Child = ({ name, age, isMarried }) => {
  return (
    <div style={{ border: '1px solid blue', padding: '5px', margin: '5px' }}>
      <div>이름: {name}</div>
      <div>나이: {age}</div>
      <div>결혼 유무: {isMarried ? '기혼' : '미혼'}</div>
    </div>
  );
};

export default Child;
