import InputWithLabel from './components/InputWithLabel';

function App() {
  return (
    <>
      <img src="/src/assets/react.svg" alt="사용자 프로필" />
      <img src="/vite.svg" alt="사용자 프로필" />
      <h1>사용자 정보 입력</h1>

      <InputWithLabel label="이름" placeholder="이름을 입력하세요" />
      <InputWithLabel label="나이" placeholder="나이를 입력하세요" />

      <button onClick={() => alert('사용자 추가~')}>사용자 추가</button>
    </>
  );
}

export default App;
