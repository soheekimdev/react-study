import { combineReducers } from 'redux';
import counterReducer from './counter';
import todoReducer from './todo';

const rootReducer = combineReducers({
  counterReducer,
  todoReducer,
});

export default rootReducer;
