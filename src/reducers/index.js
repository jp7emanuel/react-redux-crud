import { combineReducers } from 'redux';
import CervejariasReducer from './reducer_cervejarias';

const rootReducer = combineReducers({
  cervejarias: CervejariasReducer
});

export default rootReducer;
