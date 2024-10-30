import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './rtcounterSlice';

const CounterRt = () => {
  const value = useSelector((state) => state.rtcounter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {value}</h1>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
    </div>
  );
};

export default CounterRt;
