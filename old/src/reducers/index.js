import { combineReducers } from 'redux';
import CervejariasReducer from './reducer_cervejarias';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  cervejarias: CervejariasReducer,
  form: formReducer
});

export default rootReducer;
