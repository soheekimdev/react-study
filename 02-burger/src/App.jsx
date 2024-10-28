import './App.css';

function App() {
  return (
    <Flex>
      <Burger />
      <CheeseBurger />
    </Flex>
  );
}

function Flex({ children }) {
  return <div className="flex">{children}</div>;
}

function Burger() {
  return (
    <div>
      <Bread />
      <Patty />
      <Lettuce />
      <Tomato />
      <Cheese />
      <Bread />
    </div>
  );
}

function CheeseBurger() {
  return (
    <div>
      <Bread />
      <Patty />
      <Cheese />
      <Patty />
      <Cheese />
      <Patty />
      <Cheese />
      <Patty />
      <Cheese />
      <Bread />
    </div>
  );
}

function Bread() {
  return (
    <div className="bread">
      밀가루
      <span>물</span>
      <span>계란</span>
      <span>이스트</span>
    </div>
  );
}

function Patty() {
  return (
    <div className="patty">
      소고기
      <span>후추</span>
      <span>소금</span>
    </div>
  );
}

function Lettuce() {
  return (
    <div className="lettuce">
      잎사귀
      <span>줄기</span>
    </div>
  );
}

function Tomato() {
  return (
    <div className="tomato">
      껍질
      <span>과육</span>
      <span>씨앗</span>
    </div>
  );
}

function Cheese() {
  return (
    <div className="cheese">
      우유
      <span>소금</span>
      <span>색소</span>
    </div>
  );
}

export default App;
