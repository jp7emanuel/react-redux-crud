import { combineReducers } from 'redux';
import StoresReducer from './store';
import StoreTypesReducer from './store-type';

const rootReducer = combineReducers({
  stores: StoresReducer,
  storeTypes: StoreTypesReducer,
});

export default rootReducer;
